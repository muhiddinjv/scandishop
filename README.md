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
- [ ] Filtering products by category name for all of the categories from BE
- [x] The descriptions provided in HTML format are parsed and presented as HTML, not as plain text
- [x] Ability to change the currency of the store to one of the available currencies