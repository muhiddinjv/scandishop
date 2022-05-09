// import LOAD_QUERY from "../../Graphql";
import Helper from '../../Helpers';
const jsonData = require('./data.json');

const initState = {
  total: 0,
  cart: [],
  items: [],
  price: [],
  currencies: [],
  selCurrency: "USD",
};

// const fetchData = () => {
//   fetch("http://localhost:4000", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: LOAD_QUERY,
//       variables: { input: { title: "" } },
//     }),
//   })
//     .then((res) => res.json())
//     .then((all) => {
//       console.log('all :>> ', all);
//       const { category: {products}, currencies } = all.data;
//       products.map((p) => initState.items.push(p));
//       currencies.map((c) => initState.currencies.push(c));
//     })
//     .catch((error) => console.log(error));
// };

const fetchData = () => {
  const { category: {products}, currencies } = jsonData.data;
  products.map((p) => initState.items.push(p));
  currencies.map((c) => initState.currencies.push(c));
};

fetchData();

const cartReducer = (state = initState, action) => {

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
        addedAttrs: [{ ...values, count: 1, id: Helper.uuid() }],
        attributes: attributes,
        gallery: gallery,
        prices: prices,
        totalCount: 1,
      };
    } else {
      const addedAttrsCopy = [...cartCopy[id].addedAttrs];
      // const foundIndex = addedAttrsCopy.findIndex((item) => {
      //   return Object.values(values).every((i) => {
      //       return Object.values(item).includes(i)
      //     }
      //   );
      // });
      const foundIndex = addedAttrsCopy.findIndex(item => {
        return Object.keys(values).every(key => {
          const newValue = values[key];
          return item[key] === newValue;
        })
      });

      if (foundIndex > -1) {
        const found = addedAttrsCopy[foundIndex];
        addedAttrsCopy[foundIndex] = { ...found, count: found.count + 1 };
      } else {
        addedAttrsCopy.push({ ...values, count: 1, id: Helper.uuid() });
      }

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

          values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc + curr.count, 0);  
              
          return {
            ...state,
            total: newTotal,
          }; 
        }
      }
    }
  }

  if (action.type === "ADD_QUANTITY") {
    for (const values of Object.values(state.cart)) {
      for (const attribute of values.addedAttrs) {
        if (attribute.id === action.id){
          attribute.count++;

          values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc + curr.count, 0);  
      
          const priceDetails = action.prices.find(
            price => price.currency === state.selCurrency
          );
          const newTotal = state.total + priceDetails.amount;
      
          return {
            ...state,
            total: newTotal
          };
        }
      }
    }
  }

  if (action.type === "SUB_QUANTITY") {  
    for (const values of Object.values(state.cart)) {
      for (const attribute of values.addedAttrs) {
        if (attribute.id === action.id){
          attribute.count--;

          if (attribute.count === 0){
            values.addedAttrs = values.addedAttrs.filter((attribute) => action.id !== attribute.id);
          }
          values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc + curr.count, 0);

          const priceDetails = action.prices.find(
            price => price.currency === state.selCurrency
          );
          const newTotal = state.total - priceDetails.amount;
      
          return {
            ...state,
            total: newTotal
          };
        }
      }  
    }
  } else {
    return state;
  }

};

export default cartReducer;

// const subtractAddDelete = (op, act, id, prices) => {
//   const operators = {
//     '+': (a, b) => a + b,
//     '-': (a, b) => a - b,
//   };
//   for (const values of Object.values(state.cart)) {
//     for (const attribute of values.addedAttrs) {
//       if (attribute.id === id){
//         act === 'subtract' && attribute.count--;
//         act === 'add' && attribute.count++;
        
//         if (attribute.count === 0){
//           values.addedAttrs = values.addedAttrs.filter((attribute) => id !== attribute.id);
//         }
//         values.totalCount = values.addedAttrs.reduce((acc, curr)=> acc + curr.count, 0);

//         const priceDetails = prices.find(
//           price => price.currency === state.selCurrency
//         );
//         const newTotal = operators[op](state.total, priceDetails.amount)
//         return {
//           ...state,
//           total: newTotal
//         };
//       }
//     }
//   }
// }
// subtractAddDelete('+', 'add', action.id, action.prices)
