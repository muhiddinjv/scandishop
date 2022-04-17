import React, { PureComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import ErrorBoundary from "./ErrorBoundary";

import { Navbar, Category, Product, Cart } from '../Components'

class App extends PureComponent {
  state = { products:[], selectedProduct:[],};

  componentDidMount() {
    setTimeout(() => {
      this.setState({products: this.props.items}) 
      this.setState({selectedProduct: [this.props.items[4]]}) 
    },500);     
  }

  selectProduct = (productId) => {
    const {items} = this.props;
    items.filter((p) => p.id === productId && this.setState({ selectedProduct: [p] }))   
  };

  changeCategory = (category) => {
    const {items} = this.props;

    if (category === 'all'){
      items.category = category;
      this.setState({products: items})
    } else {
      let products = items.filter(p => p.category === category && p)
      products.category = category;
      this.setState({products: products})
    }
  }

  
  render() {
    const { products, selectedProduct } = this.state;
    const cart = Object.values(this.props.cart);
    const totalCount = cart?.map(x=>x.totalCount).reduce((sum, a) => sum + a, 0);
    const quantity = Math.abs(totalCount);
    
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar changeCategory={this.changeCategory} quantity={quantity}/>
        </ErrorBoundary>
        <Routes>
          <Route exact path="/" element={
            <ErrorBoundary>
              <Category products={products} selectProduct={this.selectProduct} selectedProduct={selectedProduct}/>
            </ErrorBoundary>} 
          />
          <Route path="/product" element={<Product products={selectedProduct} />} />
          <Route exact path="/cart/*" element={<Cart products={selectedProduct}/>} />
        </Routes>
      </main>
    );
  }
}

const mapStateToProps = (state)=>{
  const {items, total, cart} = state;
  return {items, total, cart}
  }


export default connect(mapStateToProps)(App)