import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  total: 0,
  cart:{},
  items: [],
  price: [],
  currencies: [],
  addedItems: [],
  selAttribute: [],
  selCurrency: "USD",
};

const fetchData = () => {
  fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: LOAD_QUERY,
      variables: { input: { title: "" } },
    }),
  })
    .then((res) => res.json())
    .then((all) => {
      all.data.category.products.map((p) => initState.items.push(p));
      all.data.currencies.map((c) => initState.currencies.push(c));
    })
    .catch((error) => console.log(error));
};

fetchData();

const cartReducer = (state = initState, action) => {
  const filterItem = (id) => {
    // handle items = products (jacket, sneakers, ps5)
    const addedItem = state.items.find((item) => item.id === id);
    const newItems = state.addedItems.filter((item) => id !== item.id);

    // handle price amount (e.g. 144.69) PROBLEM HERE
    const priceNumbers = addedItem?.prices.filter(
      (price) => price.currency === state.selCurrency && price.amount
    );

    const price = priceNumbers[0].amount;
    return { addedItem, price, newItems };
  };

  if (action.type === "CHANGE_CATEGORY") {
    return { ...state, category: action.categoryName };
  }

  if (action.type === "SELECT_CURRENCY") {
    return { ...state, selCurrency: action.currency };
  }
  
  if (action.type === "SELECT_ATTRIBUTE") {
    // const filtered = filterItem(action.id);
    // const { addedItem } = filtered;

    // addedItem.attributes.filter(
    //   (attr) => attr.name === action.name && (attr.selected = action.attr)
    //   );
    

    const copyCart = {...state.cart};
    // const id = action.id;
    // const name = action.name;
    // const value = action.attr;
    const { id, name, attr } = action;
    
    if(!copyCart[id]) {
      copyCart[id]={
        attrs: [{
            [name]: attr,
            count: 0
          }]
      };
      
      return {
        ...state,
        cart: copyCart
      };
    } else {
      console.log('copyCart', copyCart)
      let copyAttrs = [...copyCart[id].attrs];
      const found = copyAttrs.find(item => item[name] === attr);

      if (!found) {
        copyAttrs = [...copyAttrs, {[name]: attr, count: 0}] 
      }
      copyCart[id].attrs = copyAttrs;

      return {
        ...state,
        cart: copyCart
      };
    }
  }   
    
  
  if (action.type === "ADD_TO_CART") {
    // const filtered = filterItem(action.id);
    // const { price, addedItem } = filtered;

    const productId = action.id;
    const values = action.values;  
    const cartCopy = { ...state.cart };
    
    if (!cartCopy[productId]) {
      cartCopy[productId] = {
        items: [{ ...values, count: 1 }],
        totalCount: 1
      };
      
    } else {
      const itemsCopy = [...cartCopy[productId].items];
      // const obj = {name: 'a', age: 21}
      // const arr = Object.values(obj); // ['a', 21]

      const foundIndex = itemsCopy.findIndex((item) => {
        return Object.values(values).every((i) =>
          Object.values(item).includes(i)
        );
      });

      if (foundIndex > -1) {
        const found = itemsCopy[foundIndex];
        itemsCopy[foundIndex] = { ...found, count: found.count + 1 };
      } else {
        itemsCopy.push({ ...values, count: 1 });
      }

      // items = [{conunt: 1}, {count: 3}]
      cartCopy[productId].items = itemsCopy;
      cartCopy[productId].totalCount = itemsCopy.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
    }
    
    return {
      ...state,
      cart: cartCopy
    }
  }
  
  
  if (action.type === "REMOVE_ITEM") {
    const itemToRemove = state.addedItems.find((item) => action.id === item.id);
    const filtered = filterItem(action.id);
    const { price, newItems } = filtered;

    //calculating the total
    const newTotal = state.total - price * itemToRemove.quantity;
    itemToRemove.attributes.map((x) => (x.selected = ""));
    return {
      ...state,
      addedItems: newItems,
      total: newTotal,
    };
  }

  //INSIDE CART COMPONENT
  if (action.type === "ADD_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;

    addedItem.quantity += 1;
    const newTotal = state.total + price;

    return { ...state, total: newTotal };
  }

  if (action.type === "SUB_QUANTITY") {
    const filtered = filterItem(action.id);
    const { price, addedItem, newItems } = filtered;

    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      const newTotal = state.total - price;
      addedItem.attributes.map((x) => (x.selected = ""));
      return {
        ...state,
        addedItems: newItems,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      const newTotal = state.total - price;
      return { ...state, total: newTotal };
    }
  } else {
    return state;
  }
};

export default cartReducer;


// const treeData = {
//   id: 1,
//   title: "Group1",
//   tagClass: "Object",
//   children: [
//       {
//           id: 2,
//           title: "Group2",
//           tagClass: "Object",
//           children: [
//               { id: 3, title: "Tag1", tagClass: "Variable" },
//               { id: 4, title: "Tag2", tagClass: "Variable" },
//           ],
//       },
//       { id: 5, title: "Group3", tagClass: "Object" },
//       { id: 6, title: "Tag3", tagClass: "Variable" },
//   ],
// };

// console.log('treeData :>> ', treeData);

// const recursiveFunc = (treeData) => {
// if(treeData.children){
//    //filter treeData.children
//    const children = treeData.children.filter(child => {
//     if(child.tagClass === 'Variable'){
//       //if tagclass is variable we create tagIds property for treeData
//       treeData.tagIds? treeData.tagIds.push(child.id) : treeData.tagIds = [child.id];
//       // return false to filter out this child
//       return false
//     }
//     //not varaible tagclass, we go deeper
//     recursiveFunc(child);
//     //keep the child
//     return true
//   })
//   //if children is an empty array, delete children property from treeData
//   children.length === 0 ? delete treeData.children : treeData.children = children
// }
// return treeData
// };

// const updatedTreeData = recursiveFunc(treeData);

// console.log('updatedTreeData: ',updatedTreeData)

// const activityItems = [
//   { name: "Sunday", items: [{ name: "Gym", activity: "weights" }] },
//   {
//     name: "Monday",
//     items: [
//       { name: "Track", activity: "race" },
//       { name: "Work", activity: "meeting" },
//       {
//         name: "Swim",
//         items: [
//           { name: "Beach", activity: "scuba diving" },
//           { name: "Pool", activity: "back stroke" },
//         ],
//       },
//     ],
//   },
// ];

// let findDeep = (data, activity) => {
//   return data.some((e) => {
//     if (e.activity === activity) return true;
//     else if (e.items) return findDeep(e.items, activity);
//   });
// };

// console.log(findDeep(activityItems, "scuba diving"));


 /**
     * My method
     * * important info is highlighted
     * ! Old method! do not use!
     * ? should this method be exposed in the public API?
     * TODO: refactor this method so that it conforms to the API
     * @param myParam is the parameter for this method
     **/

    //* important info
    //! old method be careful
    //? is it really necessary?
    //TODO: refactor this part
    //@param myParam
    //MORE THAN 3 SLASHES = ////CROSS OUT

    // const posts = [
    //   {
    //     "categories": [
    //       {
    //         "title": "tag1"
    //       },
    //       {
    //         "title": "tag2"
    //       },
    //       {
    //         "title": "tag3"
    //       }
    //     ],
    //     "title": "First post"
    //   },
    //   {
    //     "categories": [
    //       {
    //         "title": "tag2"
    //       },
    //       {
    //         "title": "tag3"
    //       }
    //     ],
    //     "title": "Second Post"
    //   }
    // ];

    // const filter = "tag1";

    // const filtered = posts.filter(post => {
    //   return post.categories.some(cat => cat.title === filter)
    // });

// const findIndex = function (array, cb) {     
//   if (array) {         
//     for (let i = 0; i < array.length; i++) {             
//       if (true === cb(array[i])) return i;         
//     }    
//   }     
//   return -1; 
// }

// const someFunction = () => {
//   const productId = action.product.id;
//   const size = action.size;

//   if (findIndex(state.cart, product => (product.id === productId && product.size === size)) !== -1) {
//     const cart = state.cart.reduce((cartAcc, product) => {
//         if (product.id === productId  && product.size === size) {
//             cartAcc.push({ ...product, size: size, qty: parseInt(product.qty) 
//               + parseInt(action.qty), sum: (product.discount ? product.salePrice : product.price) 
//               * (parseInt(product.qty) + parseInt(action.qty)) }) // Increment qty
//         } else {
//             cartAcc.push(product)
//         }
//         return cartAcc
//     }, [])

//   return { ...state, cart }
//   }
// }

// const items = [
//   {
//     productId: 1,
//     options: [
//       {
//         size: '41',
//         color: 'white',
//         count: 1
//       },
//       {
//         size: '42',
//         color: 'black',
//         count: 1
//       }
//     ]
//   }
// ]