import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  items: [],
  addedItems: [],
  currencies: [],
  selectedCurrency: "USD",
  price: [],
  attributes: [{id:null,attr:null}],
  attributes2: [],
  total: 0,
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
    .then((data) => {
      data.data.category.products.map((ps) => initState.items.push(ps));
      data.data.currencies.map((c) => initState.currencies.push(c));
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {
  const filterItem = (id) => {
    // handle items = products (jacket, sneakers, ps5)
    const addedItem = state.items.find((item) => item.id === id);
    const newItems = state.addedItems.filter((item) => id !== item.id);

    // handle price amount (e.g. 144.69)
    const priceNumbers = addedItem.prices.filter((price) =>
      price.currency === state.selectedCurrency ? price.amount : null
    );
    const price = priceNumbers[0].amount;

    // handle attributes (color, size, capacity)
    const addedItemAttributes = addedItem.attributes[0].items.map(
      (item) => item.value
    );
    const attributesInCart = state.attributes.filter(
      (element) => !addedItemAttributes.includes(element)
    );

    return { addedItem, price, newItems, attributesInCart };
  };

  if (action.type === "SELECT_CURRENCY") {
    return { ...state, selectedCurrency: action.currency };
  }

  if (action.type === "ATTRIBUTE_SELECTED") {
    const filtered = filterItem(action.id);
    const { addedItem } = filtered;

    let attributeValues = addedItem.attributes.map((attribute) =>
      attribute.items.find((item) => item.value === action.attr)
    );
    let selectedAttribute = attributeValues.filter((attr) =>
      attr ? attr.value : ""
    );

    // let x = state.attributes[0].id === action.id ? state.attributes[0].attr = selectedAttribute[0].value : [...state.attributes, selectedAttribute[0].value];

    // let x = state.attributes.find(item => item.id === action.id);

    const selAttrVal = selectedAttribute[0].value;

    
    const addOrReplace = () => {
      for (const item of state.attributes) {
        if (item.id === action.id){
          return {...item, attr: selAttrVal}
        } else {
          return [...state.attributes, {id:action.id, attr: selAttrVal}]
        }
      }
    }; 
    addedItem.attributes[0].selected  = selAttrVal;
    console.log(addedItem.attributes[0]);

    // console.log("addedItem: ",addedItem);
    const setAttributes = {
      ...state,
      attributes: [{id:action.id, attr:selectedAttribute[0].value}],
      attributes2: addOrReplace(),
      // attributes: [selectedAttribute[0].value],
      // attributes: [...state.attributes, selectedAttribute[0].value],
    };
    
    //https://www.myntra.com/checkout/cart
    // const uniqueAttributes = {
    //   ...state,
    //   attributes: [...new Set(setAttributes.attributes)],
    // };

    return setAttributes;
  }

  if (action.type === "ADD_TO_CART") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    //check if the action id exists in the addedItems
    const existedItem = state.addedItems.find((item) => action.id === item.id);
    if (existedItem) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + price,
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      const newTotal = state.total + price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }

  if (action.type === "REMOVE_ITEM") {
    const itemToRemove = state.addedItems.find((item) => action.id === item.id);
    const filtered = filterItem(action.id);
    const { price, newItems, attributesInCart } = filtered;

    //calculating the total
    const newTotal = state.total - price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: newItems,
      total: newTotal,
      attributes: attributesInCart,
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === "ADD_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    addedItem.quantity += 1;
    const newTotal = state.total + price;
    return { ...state, total: newTotal };
  }

  if (action.type === "SUB_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem, newItems, attributesInCart } = filtered;

    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      const newTotal = state.total - price;

      return {
        ...state,
        addedItems: newItems,
        total: newTotal,
        attributes: attributesInCart,
      };
    } else {
      addedItem.quantity -= 1;
      const newTotal = state.total - price;
      return { ...state, total: newTotal };
    }
  } else {
    return state;
  }
};

export default cartReducer;
