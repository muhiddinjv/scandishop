// Action creators (customers with forms)

//add cart action
export const addToCart = (id) => {
  return { // return action (form)
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

export const addGallery = (gallery) => {
  console.log('addGallery action: ',gallery);
  
  return {type: "ADD_GALLERY",gallery};
};

export const selectImage = (image) => {
  return {type: "SELECT_IMAGE",image};
};