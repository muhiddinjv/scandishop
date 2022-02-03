import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  items: [],
  images:[],
  addedItems: [],
  addedImage: [],
  currencies: [],
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
    const addedItem = state.items.find((item) => item.id === id); 
    const cost = addedItem.prices.filter(price=> price.currency === state.selectedCurrency ? price.amount : null);
    const elemAttrValues = addedItem.attributes[0].items.map(item=>item.value)
    const intersection = state.attributes.filter(element => !elemAttrValues.includes(element));
    const new_items = state.addedItems.filter((item) => id !== item.id);
    const price = cost[0].amount;
    return {addedItem, price, new_items, intersection}
  }
  

  if (action.type === 'SELECT_CURRENCY'){     
    return {...state, selectedCurrency: action.currency };
  } 
  
  if (action.type === "ADD_TO_CART") {
    console.log('attr: ', state.attributes);
    
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;
    
    //check if the action id exists in the addedItems
    const existed_item = state.addedItems.find((item) => action.id === item.id);
    if (existed_item) {
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
    const { price, new_items, intersection } = filtered;   
    
    //calculating the total
    const newTotal = state.total - price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
      attributes: intersection
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === "ADD_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    addedItem.quantity += 1;
    const newTotal = state.total + price;
    return {...state, total: newTotal};
  }

  if (action.type === "SUB_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem, new_items, intersection } = filtered;
    
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {      
      const newTotal = state.total - price;

      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
        attributes: intersection
      };
    } else { 
      addedItem.quantity -= 1;
      const newTotal = state.total - price;
      return {...state, total: newTotal};
    }
  }

  if (action.type === 'ATTRIBUTE_SELECTED'){
    
    const filtered = filterItem(action.id);
    const { addedItem } = filtered;
    const target = action.e.target.classList.value.includes("capacity") ? 1 : 0;    
    const addedAttr = addedItem.attributes[target].items.find(item=>item.value === action.attr)   
    const duplicate = {...state, attributes: [...state.attributes, addedAttr.value]}
    const uniqueAttributes = {...state, attributes: [...new Set(duplicate.attributes)]}
    console.log(uniqueAttributes.attributes);
    
        
    return uniqueAttributes;
  }

  if (action.type === 'ADD_IMAGES'){
    return {...state, images: action.images}
  }

  if (action.type === 'SELECT_IMAGE'){
    return {...state, addedImage: action.image, images: state.images}
  } else { return state }  
};

export default cartReducer;
