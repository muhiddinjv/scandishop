// Action creators (customers with forms)

export const selectCurrency = (currency) => {
  // returns action (form to give to departments)  
  return {type: "SELECT_CURRENCY",currency}
};

export const selectAttribute = (id,attr,name) => {  
  return {type: "SELECT_ATTRIBUTE",id,attr,name};
};

export const addToCart = (id, values) => {
  return {type: "ADD_TO_CART",id, values}};

export const removeItem = (id) => {  
  return {type: "REMOVE_ITEM",id};
};

export const subtractQuantity = (id) => {
  return {type: "SUB_QUANTITY",id};
};

export const addQuantity = (id) => {  
  return {type: "ADD_QUANTITY",id};
};