const LOAD_PRODUCTS = `
  {
    categories{
      name
      products{
        id
        name
        brand
        category
        inStock
        description
        prices{
          currency
          amount
        }
        attributes{
          name
          items{
            id
            value
          }
        }
        gallery
      }
    }
    currencies
  }
`;

export default LOAD_PRODUCTS;
