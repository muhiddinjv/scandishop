const initState = {
  total: 0,
  items: [],
  price: [],
  category: '',
  newItems: [],
  addedItem: [],
  addedItems: [],
  selCurrency: "USD",
};  

const cartReducer = (state = initState, action) => {
  
  const filterItem = (id) => {
    // handle items = products (jacket, sneakers, ps5)
    const addedItem = state.items.find((item) => item.id === id);
    const newItems = state.addedItems.filter((item) => id !== item.id);

    console.clear();
    console.log('state.items :>> ', state.items);
    console.log('addedItem in filterItem:>> ', addedItem);
    // handle price amount (e.g. 144.69) PROBLEM HERE
    const priceNumbers = addedItem?.prices.filter((price) =>
      price.currency === state.selCurrency && price.amount
    );

    const price = priceNumbers[0].amount;
    return { ...state, addedItem, price, newItems };
    // return { addedItem, price, newItems };

    // return {
    //   ...state,
    //   addedItem: addedItem,
    //   newItems: newItems,
    //   price: price
    // };
  };

  if (action.type === "SET_REDUX_DATA") {
    return {...state, items: action.items.category.products};
  }

  if (action.type === "CHANGE_CATEGORY") {
    return {...state, category: action.categoryName};
  }
    
  if (action.type === "SELECT_CURRENCY") {
    console.log(state.addedItems)
    return {...state, selCurrency: action.currency};
  }

  if (action.type === "ATTRIBUTE_SELECTED") {
    const filtered = filterItem(action.id);
    const { addedItem } = filtered;

    addedItem.attributes.filter(attr => attr.name === action.name ? attr.selected = action.attr : null)
    
    console.clear();
    // console.log('action.attr: ',action.attr);
    // console.log('action.name: ',action.name);
    console.log('addedItem.attributes :>> ', addedItem.attributes);
  }

  if (action.type === "ADD_TO_CART") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;
    //check if the action id exists in the addedItems
    const existedItem = state.addedItems.find((item) => action.id === item.id);
    console.log('existedItem :>> ', existedItem === true);
    if (existedItem) {
      console.log('addedItem.quantity :>> ', addedItem.quantity);
      addedItem.quantity += 1;
      // debugger;
      return {
        ...state,
        total: state.total + price,
        // addedItems: [...state.addedItems, addedItem],
      };
    } else {
      addedItem.quantity = 1;
      console.log('addedItem.quantity :>> ', addedItem.quantity);
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
    const { price, newItems } = filtered;

    //calculating the total
    const newTotal = state.total - price * itemToRemove.quantity;
    itemToRemove.attributes.map(x => x.selected = '')
    return {
      ...state,
      addedItems: newItems,
      total: newTotal,
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
    const { price, addedItem, newItems } = filtered;

    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      const newTotal = state.total - price;
      addedItem.attributes.map(x => x.selected = '')
      return {
        ...state,
        addedItems: newItems,
        total: newTotal,
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
