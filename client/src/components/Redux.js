// import { connect } from "react-redux";
console.clear();

// a customer (action creator) dropping off a policy form
export const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount,
    },
  };
};

export const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name,
    },
  };
};

export const createClaim = (name, moneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      moneyToCollect: moneyToCollect,
    },
  };
};


// Reducers (Departments)
export const claimsHistory = (oldListOfClaims, action) => {
  if (action.type === "CREATE_CLAIM"){
    // we care about this action (form)
    return [...oldListOfClaims, action.payload]
  } else {
    // we don't give a damn about this action (form)
  }
}