//add cart action
export const addToCart = (id) => {
  return {
    type: "ADD_TO_CART",
    id,
  };
};
//remove item action
export const removeItem = (id) => {
  return {
    type: "REMOVE_ITEM",
    id,
  };
};
//subtract qt action
export const subtractQuantity = (id) => {
  return {
    type: "SUB_QUANTITY",
    id,
  };
};
//add qt action
export const addQuantity = (id) => {  
  return {
    type: "ADD_QUANTITY",
    id,
  };
};

export const selectSize = (size, id) => {
  return {
    type: "SIZE_SELECTED",size,id,
  };
};
