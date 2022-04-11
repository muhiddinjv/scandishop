// Action creators (customers with forms)

export const selectCurrency = (currency) => {
  // returns action (form to give to departments)  
  return {type: "SELECT_CURRENCY",currency}
};

export const addToCart = (product, values) => {
  return {type: "ADD_TO_CART",product, values}};

export const removeItem = (id) => {  
  return {type: "REMOVE_ITEM",id};
};

export const subtractQuantity = (attr) => {
  return {type: "SUB_QUANTITY",attr};
};

export const addQuantity = (attr) => {  
  return {type: "ADD_QUANTITY",attr};
};

// export const selectAttribute = (id,attr,name) => {  
//   return {type: "SELECT_ATTRIBUTE",id,attr,name};
// };