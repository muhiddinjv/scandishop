# Scandishop

## Tech Stack:
- Focused on Class components
- State management library: Redux
- Backend: GraphQL

## Functionality
- [x] PLP - product listing page, a.k.a. category page
- [x] PDP - product description page, a.k.a. product page
- [x] Cart page + Cart overlay (minicart)

## Details
- [x] Ability to add/remove products and change their amounts in cart - on the cart page itself, "Category" and "Product" should be provided.
- [x] For products that have various options (attributes) - the options should be selected.
- [x] The selected options of added to cart products should be visible in cart overlay and in cart page.
- [x] If an attribute is a swatch attribute (type = swatch), a representation of the value should be rendered on "Category" and "Product", rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- [ ] Filtering products by category name for all of the categories from BE
- [x] The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text
- [x] Ability to change the currency of the store to one of the available currencies

1. terminal: 1) mkdir src/reducers (creates a folder)  
2. terminal: 2) echo "" > src/reducers/rotateReducer.js (creates a file).