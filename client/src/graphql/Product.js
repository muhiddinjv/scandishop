const LOAD_PRODUCT = `
  {
    product(id: "huarache-x-stussy-le") {
      name
      inStock
      category
      brand
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
`;

export default LOAD_PRODUCT;
