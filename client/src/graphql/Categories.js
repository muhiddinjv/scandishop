// import { gql } from "@apollo/client";

const LOAD_DATA = `
  {
    categories {
      name
      products {
        id
        name
        inStock
        description
        attributes {
          name
          items {
            value
          }
        }
        prices {
          currency
          amount
        }
        gallery
      }
    }
    currencies
  }
`;


export default LOAD_DATA;
