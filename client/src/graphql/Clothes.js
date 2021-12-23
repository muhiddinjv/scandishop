const LOAD_CLOTHES = `
query clothes($input: CategoryInput = {title: "clothes"}) {
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
export default LOAD_CLOTHES;
