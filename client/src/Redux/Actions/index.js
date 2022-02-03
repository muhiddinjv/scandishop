// Action creators (customers with forms)

export const selectCurrency = (currency) => {  
  return {// return action (form)
    type: "SELECT_CURRENCY",currency
  };
};

//add cart action
export const addToCart = (id) => {
  return {
    type: "ADD_TO_CART",id};
};

//remove item action
export const removeItem = (id) => {  
  return {type: "REMOVE_ITEM",id};
};

//subtract qt action
export const subtractQuantity = (id) => {
  return {type: "SUB_QUANTITY",id};
};

//add qt action
export const addQuantity = (id) => {  
  return {type: "ADD_QUANTITY",id};
};

export const selectAttribute = (attr, id,e) => {  
  return {type: "ATTRIBUTE_SELECTED",attr,id,e};
};