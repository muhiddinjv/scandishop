import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Product from "./components/Product"; 
import Cart from "./components/Cart";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart } from './redux/actions/cartActions'

class App extends Component {
  constructor(props) {
    super(props);
    this.filterProduct = this.filterProduct.bind(this);
    this.state = { products: [] };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({products: [this.props.items[0]]}) 
    }, 500);     
  }

  filterProduct = (productId) => {
    const items = this.props.items;
    items.filter((p) => p.id === productId ? this.setState({ products: [p] }) : <div className="loader"/>)    
  };

  render() {
    console.log("App render: ", this.state.products);
    return (
      <div className="app">
        <Navbar
          curr={this.props.currencies}
          filterProduct={this.filterProduct}
        />
        <Routes>
          <Route exact path="/" element={<Category products={this.state.products} addToCart={this.props.addToCart}/>} />
          <Route path="/product" element={<Product products={this.state.products} addToCart={this.props.addToCart} />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    items: state.items,
    currencies: state.currencies
    }
  }

const mapDispatchToProps= (dispatch)=>{
  return{
    addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)