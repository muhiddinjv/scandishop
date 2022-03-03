// Action creators (customers with forms)

export const changeCategory = (categoryName) => {  
  // returns action (form to give to departments)  
  return {type: "CHANGE_CATEGORY",categoryName};
};

export const selectCurrency = (currency) => {
  return {type: "SELECT_CURRENCY",currency}
};

export const selectAttribute = (id,attr,name) => {  
  return {type: "ATTRIBUTE_SELECTED",id,attr,name};
};

export const addToCart = (id) => {
  return {type: "ADD_TO_CART",id}};

export const removeItem = (id) => {  
  return {type: "REMOVE_ITEM",id};
};

export const subtractQuantity = (id) => {
  return {type: "SUB_QUANTITY",id};
};

export const addQuantity = (id) => {  
  return {type: "ADD_QUANTITY",id};
};