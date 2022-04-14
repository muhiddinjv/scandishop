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
    
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar changeCategory={this.changeCategory} />
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
  const {items, total} = state;
  return {items, total}
  }


export default connect(mapStateToProps)(App)