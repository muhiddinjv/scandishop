# Scandishop

## Tech Stack:
- Focused on Class components
- State management library: Redux
- Backend: GraphQL

## Functionality
- [x] PLP - product listing page, a.k.a. category page
- [x] PDP - product description page, a.k.a. product page
- [x] Cart page + Cart overlay

## Details
- [x] Ability to add/remove products and change their amounts in cart - on the cart page itself, "Category" and "Product".
- [x] For products that have various options (attributes) - the options can be selected.
- [x] The selected options of added to cart products are visible in cart overlay and in cart page.
- [x] If an attribute is a swatch attribute (type = swatch), a representation of the value is rendered on "Category" and "Product"
- [x] Filtering products by category name for all of the categories from BE
- [x] The descriptions provided in HTML format are parsed and presented as HTML, not as plain text
- [x] Ability to change the currency of the store to one of the available currencies

## Updated Details
- [ ] Add changes to fetch the latest (updated) endpoint
- [x] Hard to click on currencies in currency switcher, please make clickable area bigger
- [x] Categories should be ‘all’,'clothes' and ‘tech’ and should be listed all products
- [ ] Add different product attributes to cart
- [x] Use PureComponent instead Component
- [x] Out of stock product logic is implemented
- [x] Use const instead let and var
- [x] Use variable destructuring
- [x] Added cart page