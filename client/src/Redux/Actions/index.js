// Action creators (customers with forms)

export const setReduxData = (items) => {  
  // returns action (form to give to departments)  
  return {type: "SET_REDUX_DATA",items};
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