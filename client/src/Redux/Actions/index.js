// Action creators (customers with forms)
export const selectCurrency = (currency) => {
  // returns action (form to give to departments)  
  return {type: "SELECT_CURRENCY",currency}
};

export const addToCart = (product, values) => {
  return {type: "ADD_TO_CART",product, values}
};

export const removeItem = (id, prices) => {  
  return {type: "REMOVE_ITEM",id, prices};
};

export const subtractQuantity = (id, prices) => {
  return {type: "SUB_QUANTITY",id, prices};
};

export const addQuantity = (id, prices) => {  
  return {type: "ADD_QUANTITY",id, prices};
};