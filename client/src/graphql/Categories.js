// import { gql } from "@apollo/client";

// const LOAD_CATEGORIES = gql`
const LOAD_CATEGORIES = `
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
  }
`;


export default LOAD_CATEGORIES;
