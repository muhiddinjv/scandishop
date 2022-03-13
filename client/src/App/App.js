import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart } from '../Redux/Actions';
import ErrorBoundary from "./ErrorBoundary";

import { Navbar, Category, Product, Cart } from '../Components'

class App extends Component {
state = { products:[], selectedProduct:[],};

componentDidMount() {
  setTimeout(() => {
    this.setState({products: this.props.items}) 
  },500);     
}

  selectProduct = (productId) => {
    const items = this.props.items;
    items.filter((p) => p.id === productId ? this.setState({ selectedProduct: [p] }) : <div className="loader"/>)   
  };

  changeCategory = (catName) => {
    const products = this.props.items

    if (catName === 'all'){
      products.name = catName;
      this.setState({products: products})
    } else {
      let category = products.filter(p => p.category === catName && p)
      category.name = catName;
      this.setState({products: category})
    }
  }

  
  render() {
    const { products, selectedProduct } = this.state;
    const { addedItems, addToCart } = this.props;

    const quantity = addedItems?.map(x=>x.quantity).reduce((sum, a) => sum + a, 0);
    // console.log(quantity);
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar
            changeCategory={this.changeCategory}
            qty={quantity}
          />
        </ErrorBoundary>
          <Routes>
            <Route exact path="/" element={
              <ErrorBoundary>
                <Category products={products} addToCart={addToCart} selectProduct={this.selectProduct}/>
              </ErrorBoundary>} 
            />
            <Route path="/product" element={<Product 
              products={selectedProduct} />} 
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)