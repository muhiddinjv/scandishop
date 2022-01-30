// Action creators (customers with forms)

export const selectCurrency = (currency, id) => {  
  return {// return action (form)
    type: "SELECT_CURRENCY",currency,id
  };
};

// export const setPrice = (id, price) => {  
//   return {
//     type: "SET_PRICE",id, price
//   };
// };

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

export const addImages = (images) => {  
  return {type: "ADD_IMAGES",images};
};

export const selectImage = (image) => {
  return {type: "SELECT_IMAGE",image};
};