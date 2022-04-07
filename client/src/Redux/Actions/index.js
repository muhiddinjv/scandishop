// Action creators (customers with forms)

export const selectCurrency = (currency) => {
  // returns action (form to give to departments)  
  return {type: "SELECT_CURRENCY",currency}
};

export const selectAttribute = (id,attr,name) => {  
  return {type: "SELECT_ATTRIBUTE",id,attr,name};
};

export const addToCart = (product, values) => {
  return {type: "ADD_TO_CART",product, values}};

export const removeItem = (id) => {  
  return {type: "REMOVE_ITEM",id};
};

export const subtractQuantity = (attr, selProducts) => {
  return {type: "SUB_QUANTITY",attr, selProducts};
};

export const addQuantity = (attr, selProducts) => {  
  return {type: "ADD_QUANTITY",attr, selProducts};
};