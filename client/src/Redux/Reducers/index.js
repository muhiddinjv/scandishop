import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  items: [],
  images:[],
  addedItems: [],
  addedImage: [],
  currencies: [],
  // currSymbol: ["\u0024"],
  selectedCurrency: 'USD',
  price: [],
  attributes: [],
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
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {

  const filterItem = id => {
    let addedItem = state.items.find((item) => item.id === id); 
    
    let cost = addedItem.prices.filter(price=> price.currency === state.selectedCurrency ? price.amount : null);
    let new_items = state.addedItems.filter((item) => id !== item.id);
    // let price = Math.round(cost[0].amount * 100) / 100;
    let price = cost[0].amount;
    return {addedItem, price, new_items}
  }
  

  if (action.type === 'SELECT_CURRENCY'){     
    return {...state, selectedCurrency: action.currency };
  } 
  
  if (action.type === "ADD_TO_CART") {
    let filtered = filterItem(action.id);
    const { price, addedItem } = filtered;
    
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
    let filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    addedItem.quantity += 1;
    let newTotal = state.total + price;
    return {...state, total: newTotal};
  }

  if (action.type === "SUB_QUANTITY") {
    let filtered = filterItem(action.id);
    const { price, addedItem, new_items } = filtered;
    
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {      
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
    console.log('attr: ', state.attributes);

    let filtered = filterItem(action.id);
    const { addedItem } = filtered;
    let target = action.e.target.classList.value.includes("capacity") ? 1 : 0;    
    let addedAttr = addedItem.attributes[target].items.find(item=>item.value === action.attr)   
     
    return {...state, attributes: [...state.attributes, addedAttr.value]}
  }

  if (action.type === 'ADD_IMAGES'){
    return {...state, images: action.images}
  }

  if (action.type === 'SELECT_IMAGE'){
    return {...state, addedImage: action.image, images: state.images}
  } else { return state }  
};

export default cartReducer;
