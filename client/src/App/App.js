import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart } from '../Redux/Actions';
import ErrorBoundary from "./ErrorBoundary";

import { Navbar, Category, Product, Cart } from '../Components'

class App extends Component {
  constructor(props) {
    super(props);
    this.filterProduct = this.filterProduct.bind(this);
    this.state = { products: [], currencies:[] };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({products: [this.props.items[0]]}) 
      this.setState({currencies: this.props.currencies}) 
    }, 500);     
  }

  filterProduct = (productId) => {
    const items = this.props.items;
    items.filter((p) => p.id === productId ? this.setState({ products: [p] }) : <div className="loader"/>)    
  };
  
  render() {
    const quantity = this.props.addedItems.map(x=>x.quantity).reduce((sum, a) => sum + a, 0);
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar
            curr={this.state.currencies}
            filterProduct={this.filterProduct}
            products={this.state.products}
            qty={quantity}
          />
        </ErrorBoundary>
          <Routes>
            <Route exact path="/" element={
              <ErrorBoundary>
                <Category products={this.state.products} addToCart={this.props.addToCart} />
              </ErrorBoundary>} 
            />
            <Route path="/product" element={<Product products={this.state.products} addToCart={this.props.addToCart} />} />
            <Route exact path="/cart/*" element={<Cart qty={quantity} />} />
          </Routes>
      </main>
    );
  }
}

const mapStateToProps = (state)=>{
  const {items, currencies, addedItems, total} = state;
  return {items, currencies, addedItems, total}
  }

const mapDispatchToProps= (dispatch)=>{
  return{
    addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)