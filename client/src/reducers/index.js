import LOAD_QUERY from "../graphql/Query";

const initState = {
  items: [],
  images:[],
  addedItems: [],
  addedImage: [],
  currencies: [],
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
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {
  //INSIDE APP COMPONENT

  if (action.type === 'SELECT_CURRENCY'){
    console.log("reducer SEL_CUR: ",action.currency);
    // return {...state, addedImage: action.image, images: state.images}
  } 
  
  if (action.type === "ADD_TO_CART") {
    let addedItem = state.items.find((item) => item.id === action.id);    
    let price = Math.round(addedItem.prices[0].amount);    
    
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
    let price = Math.round(itemToRemove.prices[0].amount);
    let new_items = state.addedItems.filter((item) => action.id !== item.id);

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
    let addedItem = state.items.find((item) => item.id === action.id);
    let price = Math.round(addedItem.prices[0].amount);
    addedItem.quantity += 1;
    let newTotal = state.total + price;
    return {...state, total: newTotal};
  }

  if (action.type === "SUB_QUANTITY") {
    let addedItem = state.items.find((item) => item.id === action.id);
    let price = Math.round(addedItem.prices[0].amount);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
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
    let addedItem = state.items.find((item) => item.id === action.id);
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
