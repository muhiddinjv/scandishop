const LOAD_QUERY = `
query All($input: CategoryInput) {
  category(input: $input){
    name
    products{
      id
      name
      brand
      inStock 
      category
      description
      prices{
        currency
        amount
      }
      attributes{
        name
        items{
          value
        }
      }
      gallery
    }
  }
  currencies
}
`;
export default LOAD_QUERY;
