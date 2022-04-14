import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  total: 0,
  cart: [],
  items: [],
  price: [],
  currencies: [],
  addedItems: [],
  selCurrency: "USD",
};

const fetchData = () => {
  fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: LOAD_QUERY,
      variables: { input: { title: "" } },
    }),
  })
    .then((res) => res.json())
    .then((all) => {
      all.data.category.products.map((p) => initState.items.push(p));
      all.data.currencies.map((c) => initState.currencies.push(c));
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // const findAllByKey = (obj, keyToFind) => {
  //   return Object.entries(obj)
  //     .reduce((acc, [key, value]) => (key === keyToFind)
  //       ? acc.concat(value)
  //       : (typeof value === 'object')
  //       ? acc.concat(this.findAllByKey(value, keyToFind))
  //       : acc
  //     , [])
  // }

  if (action.type === "SELECT_CURRENCY") {
    return { ...state, selCurrency: action.currency };
  }

  if (action.type === "ADD_TO_CART") {
    const {
      product: { id, name, brand, prices, attributes, gallery },
      values,
    } = action;
    const cartCopy = { ...state.cart };

    if (!cartCopy[id]) {
      cartCopy[id] = {
        name: name,
        brand: brand,
        addedAttrs: [{ ...values, count: 1, id: uuid() }],
        attributes: attributes,
        gallery: gallery,
        prices: prices,
        totalCount: 1,
      };
    } else {
      const addedAttrsCopy = [...cartCopy[id].addedAttrs];
      // const obj = {name: 'a', age: 21}
      // const arr = Object.values(obj); // ['a', 21]
      const foundIndex = addedAttrsCopy.findIndex((item) => {
        return Object.values(values).forEach((i) => {
            return Object.values(item).includes(i)
          }
        );
      });

      if (foundIndex > -1) {
        const found = addedAttrsCopy[foundIndex];
        addedAttrsCopy[foundIndex] = { ...found, count: found.count + 1 };
      } else {
        addedAttrsCopy.push({ ...values, count: 1, id: uuid() });
      }

      // items = [{conunt: 1}, {count: 3}]
      cartCopy[id].addedAttrs = addedAttrsCopy;
      cartCopy[id].totalCount = addedAttrsCopy.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
    }

    const addedPricesCopy = [...cartCopy[id].prices];
    const priceDetails = addedPricesCopy?.filter(
      (price) => price.currency === state.selCurrency && price.amount
    );

    const price = priceDetails[0].amount;
    const newTotal = state.total + price;
    // console.log('state.cart', state.cart)

    return {
      ...state,
      cart: cartCopy,
      total: newTotal
    };
  }

  if (action.type === "REMOVE_ITEM") {  
    for (const values of Object.values(state.cart)) {
      for (const attribute of values.addedAttrs) {
        if (attribute.id === action.id){

          values.addedAttrs = values.addedAttrs.filter((attribute) => action.id !== attribute.id);

          const priceDetails = action.prices.find(
            price => price.currency === state.selCurrency
          );
      
          const newTotal = state.total - priceDetails.amount * attribute.count;

          values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc - curr.count, 0);      
      
          return {
            ...state,
            total: newTotal
          }; 
        }
      }
    }
  }

  if (action.type === "ADD_QUANTITY") {  
    for (const values of Object.values(state.cart)) {
      for (const attribute of values.addedAttrs) {
        if (attribute.id === action.id){
          attribute.count++
        }
      }
      values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc + curr.count, 0);      
    }

    const priceDetails = action.prices.find(
      price => price.currency === state.selCurrency
    );

    const newTotal = state.total + priceDetails.amount;

    return {
      ...state,
      total: newTotal
    };
  }

  if (action.type === "SUB_QUANTITY") {  
    for (const values of Object.values(state.cart)) {
      for (const attribute of values.addedAttrs) {
        if (attribute.id === action.id){
          attribute.count--

          if (attribute.count === 0){
            values.addedAttrs = values.addedAttrs.filter((attribute) => action.id !== attribute.id);
          }
        }
      }
      values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc - curr.count, 0);
    }

    const priceDetails = action.prices.find(
      price => price.currency === state.selCurrency
    );

    const newTotal = state.total - priceDetails.amount;

    return {
      ...state,
      total: newTotal
    };
  } else {
    return state;
  }

};

export default cartReducer;
