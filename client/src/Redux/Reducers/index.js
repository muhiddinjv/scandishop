import LOAD_QUERY from "../../Graphql/Query";

const initState = {
  total: 0,
  items: [],
  price: [],
  currencies: [],
  addedItems: [],
  selCurrency: "USD",
  selAttribute: []
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
    let findDeep = (data, category) => {
      return data.some((e) => {
        if (e.category === category) return true;
        else if (e.attributes) return findDeep(e.attributes, category);
      });
    };
    
    console.log(findDeep(state.addedItems, "clothes"));

    return { ...state, selCurrency: action.currency };
  }

  if (action.type === "ATTRIBUTE_SELECTED") {
    const filtered = filterItem(action.id);
    const { addedItem } = filtered;

    console.log('action.attr :>> ', action.attr);

    addedItem.attributes.filter(
      // (attr) => attr.name === action.name && state.selAttribute.push(action.attr)
      (attr) => attr.name === action.name && (attr.selected = action.attr)
    );
  }

  if (action.type === "ADD_TO_CART") {
    const filtered = filterItem(action.id);
    const { price, addedItem } = filtered;
    //check if the action id exists in the addedItems

    const existedItem = state.addedItems.find((item) => action.id === item.id);

    let attributeMatch = false;
    // let selectedAttribute = '';

    // for (const addItem of state.addedItems) {
    //   for (const attribute of addItem.attributes) {
    //     for (const item of attribute.items) {
    //       if (addItem.id === action.id && item.value === attribute.selected){
    //         // selectedAttribute = attribute.selected;
    //         attributeMatch = true;
    //       }
    //     }
    //   }
    // }

    const filterAttributes = (addedItem) => {
      if (addedItem.id === action.id && addedItem.value === addedItem.selected){
        attributeMatch = true;
        return
      }
      state.addedItems.forEach(item => {
        console.log('item :>> ', item);
        // this is RECURSION baby!
        filterAttributes(item)
      })
    }

    filterAttributes(state.addedItems);

    console.log('attributeMatch :>> ', attributeMatch);

    if (attributeMatch) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + price,
      };
    } else {
      addedItem.quantity = 1;
      const newTotal = state.total + price;
      
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
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

// items: [
//   {
//     productId: 1,
//     options: [
//       {
//         size: 41,
//         color: 'white',
//         count: 1
//       },
//       {
//         size: 42,
//         color: 'black',
//         count: 1
//       }
//     ]
//   }
// ],

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

const activityItems = [
  { name: "Sunday", items: [{ name: "Gym", activity: "weights" }] },
  {
    name: "Monday",
    items: [
      { name: "Track", activity: "race" },
      { name: "Work", activity: "meeting" },
      {
        name: "Swim",
        items: [
          { name: "Beach", activity: "scuba diving" },
          { name: "Pool", activity: "back stroke" },
        ],
      },
    ],
  },
];

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
