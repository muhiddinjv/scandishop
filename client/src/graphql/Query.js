const LOAD_QUERY = `
query Clothes($input: CategoryInput) {
  category(input: $input){
    name
    products{
      id
      name
      inStock 
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
