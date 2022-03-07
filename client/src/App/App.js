import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import LOAD_QUERY from "../Graphql/Query";
import { addToCart, setReduxData } from '../Redux/Actions';
import ErrorBoundary from "./ErrorBoundary";

import { Navbar, Category, Product, Cart } from '../Components'

class App extends Component {
  state = { category: [], currencies:[], selectedProduct: [] };

  componentDidMount() {
    // setTimeout(() => {
      this.changeCategory('');
    // },500);     
  }

  changeCategory = async (title) => {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: LOAD_QUERY,
        variables: { input: { title } }
      }),
    })
    const all = await response.json();
    this.setState({category: all.data.category})
    this.setState({currencies: all.data.currencies})
    this.setState({selectedProduct: [all.data.category.products[2]]})
    this.props.setReduxData(all.data)
  };

  selectProduct = (productId) => {
    const items = this.props.items;
    items.filter((p) => p.id === productId ? this.setState({ selectedProduct: [p] }) : <div className="loader"/>)   
  };

  
  render() {
    const { currencies, category, selectedProduct } = this.state;
    const { addedItems, addToCart } = this.props;

    const quantity = addedItems.map(x=>x.quantity).reduce((sum, a) => sum + a, 0);
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar
            changeCategory={this.changeCategory}
            curr={currencies}
            products={category.products}
            qty={quantity}
          />
        </ErrorBoundary>
          <Routes>
            <Route exact path="/" element={
              <ErrorBoundary>
                <Category category={category} addToCart={addToCart} selectProduct={this.selectProduct}
/>
              </ErrorBoundary>} 
            />
            <Route path="/product" element={<Product 
              products={selectedProduct} 
              addToCart={addToCart} />} 
            />
            <Route exact path="/cart/*" element={<Cart qty={quantity} />} />
          </Routes>
      </main>
    );
  }
}

const mapStateToProps = (state)=>{
  const {items, addedItems, total} = state;
  return {items, addedItems, total}
  }

const mapDispatchToProps= (dispatch)=>{
  return{
    addToCart: (id)=>{dispatch(addToCart(id))},
    setReduxData: (items)=>{dispatch(setReduxData(items))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)