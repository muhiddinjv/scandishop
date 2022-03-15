import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  total: 0,
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
      all.data.category.products.map((ps) => initState.items.push(ps));
      all.data.currencies.map((c) => initState.currencies.push(c));
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {
  const filterItem = (id) => {
    // handle items = products (jacket, sneakers, ps5)
    const addedItem = state.items.find((item) => item.id === id);
    const newItems = state.addedItems.filter((item) => id !== item.id);

    // handle price amount (e.g. 144.69) PROBLEM HERE
    const priceNumbers = addedItem?.prices.filter(
      (price) => price.currency === state.selCurrency && price.amount
    );

    const price = priceNumbers[0].amount;
    return { addedItem, price, newItems };
  };

  if (action.type === "CHANGE_CATEGORY") {
    return { ...state, category: action.categoryName };
  }

  if (action.type === "SELECT_CURRENCY") {
    return { ...state, selCurrency: action.currency };
  }

  if (action.type === "ATTRIBUTE_SELECTED") {
    const filtered = filterItem(action.id);
    const { addedItem } = filtered;

    addedItem.attributes.filter((attr) =>
      attr.name === action.name ? (attr.selected = action.attr) : null
    );
  }

  if (action.type === "ADD_TO_CART") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;
    //check if the action id exists in the addedItems
    // const existedItem = state.addedItems.find((item) => action.id === item.id);
    let attributeMatch = false;

    for (const addItem of state.addedItems) {
      for (const attribute of addItem.attributes) {
        for (const item of attribute.items) {
          if (addItem.id === action.id && item.value === attribute.selected){
            attributeMatch = true;
          }
        }
      }
    }

    if (attributeMatch) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + price,
      };
    } else {
      addedItem.quantity = 1;
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
    itemToRemove.attributes.map((x) => (x.selected = ""));
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

    console.log("addedItem.attributes :>> ", addedItem.attributes);

    return { ...state, total: newTotal };
  }

  if (action.type === "SUB_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem, newItems } = filtered;

    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      const newTotal = state.total - price;
      addedItem.attributes.map((x) => (x.selected = ""));
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
