// Action creators (customers with forms)

export const selectCurrency = (currency) => {
  // returns action (form to give to departments)  
  return {type: "SELECT_CURRENCY",currency}
};

export const selectAttribute = (id,attr,name,index) => {  
  return {type: "ATTRIBUTE_SELECTED",id,attr,name,index};
};

export const addToCart = (id, attr) => {
  return {type: "ADD_TO_CART",id, attr}};

export const removeItem = (id) => {  
  return {type: "REMOVE_ITEM",id};
};

export const subtractQuantity = (id) => {
  return {type: "SUB_QUANTITY",id};
};

export const addQuantity = (id) => {  
  return {type: "ADD_QUANTITY",id};
};