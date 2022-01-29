import LOAD_QUERY from "../graphql/Query";

const initState = {
  items: [],
  images:[],
  addedItems: [],
  addedImage: [],
  currencies: [],
  // currSymbol: ["\u0024"],
  selCurrSym: "USD",
  price:[],
  attr: [],
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
      data.data.category.products[0].gallery.map(i => initState.images.push(i)); 
      initState.price.push(data.data.category.products[0].prices[0].amount)     
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {
  //INSIDE APP COMPONENT
  // const switchCurrency = (currency) => {
  //   let symbol;
  //   switch (currency) {
  //     case "USD":
  //       symbol = "\u0024";
  //       break;
  //     case "GBP":
  //       symbol = "\u00A3";
  //       break;
  //     case "AUD":
  //       symbol = "\u20B3";
  //       break;
  //     case "JPY":
  //       symbol = "\u00A5";
  //       break;
  //     case "RUB":
  //       symbol = "\u20BD";
  //       break;
  //     default:
  //       symbol = "?";
  //   }
  //   return symbol;
  // };

  const filterItem = id => {
    let addedItem = state.items.find((item) => item.id === id); 
    let cost = addedItem.prices.filter(price=> price.currency === state.selCurrSym ? price.amount : null);
    let new_items = state.addedItems.filter((item) => id !== item.id);
    let price = Math.round(cost[0].amount); 
    
    console.clear();
    console.log('filterItem cost: ',cost);
    return {addedItem, price, new_items}
  }

  if (action.type === 'SELECT_CURRENCY'){
    // let symbol = switchCurrency(action.currency)
    // let addedItem = state.items.find((item) => item.id === action.id); 
    // let cost = addedItem.prices.filter(price=> price.currency === state.selCurrSym ? price.amount : null) 
    // let price = Math.round(cost[0].amount); 
    let filtered = filterItem(action.id);    

    return {
      ...state,
      // currSymbol: symbol,
      selCurrSym: action.currency,
      price: filtered.price
    };
  } 
  
  if (action.type === "ADD_TO_CART") {
    // let price = Math.round(addedItem.prices[0].amount); 
    // let addedItem = state.items.find((item) => item.id === action.id); 
    // let cost = addedItem.prices.filter(price=> price.currency === state.selCurrSym ? price.amount : null) 
    // let price = Math.round(cost[0].amount); 
    let filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    console.log("ADD_CART: ",price);
    
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + price,
      };
    } else {   
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  
  if (action.type === "REMOVE_ITEM") {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    // let price = Math.round(itemToRemove.prices[0].amount);
    // let new_items = state.addedItems.filter((item) => action.id !== item.id);
    let filtered = filterItem(action.id);
    const { price, new_items } = filtered;

    //calculating the total
    let newTotal = state.total - price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === "ADD_QUANTITY") {
    // let addedItem = state.items.find((item) => item.id === action.id);
    // let price = Math.round(addedItem.prices[0].amount);
    let filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    addedItem.quantity += 1;
    let newTotal = state.total + price;
    return {...state, total: newTotal};
  }

  if (action.type === "SUB_QUANTITY") {
    // let addedItem = state.items.find((item) => item.id === action.id);
    // let price = Math.round(addedItem.prices[0].amount);
    let filtered = filterItem(action.id);
    const { price, addedItem, new_items } = filtered;
    
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      // let new_items = state.addedItems.filter((item) => item.id !== action.id);
      
      let newTotal = state.total - price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - price;
      return {...state, total: newTotal};
    }
  }

  if (action.type === 'ATTRIBUTE_SELECTED'){
    // let addedItem = state.items.find((item) => item.id === action.id);
    let filtered = filterItem(action.id);
    const { addedItem } = filtered;
    let target = action.e.target.classList.value.includes("capacity") ? 1 : 0;    
    let addedAttr = addedItem.attributes[target].items.find(item=>item.value === action.attr)   
     
    return {...state, attr: [...state.attr, addedAttr.value]}
  }

  if (action.type === 'ADD_IMAGES'){
    return {...state, images: action.images}
  }

  if (action.type === 'SELECT_IMAGE'){
    return {...state, addedImage: action.image, images: state.images}
  } 

  if (action.type === "ADD_SHIPPING") {
    return {...state, total: state.total + 6};
  }

  if (action.type === "SUB_SHIPPING") {
    return {...state, total: state.total - 6};
  } else {
    return state;
  }  
};

export default cartReducer;
