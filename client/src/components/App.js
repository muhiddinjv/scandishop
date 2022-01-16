import React, { Component } from "react";
import Navbar from "./Navbar";
import Category from "./Category";
import Product from "./Product"; 
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart } from '../actions'
// import Redux from "./components/Redux";

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
    // console.log("App render: ", this.state.products);
    return (
      <div className="app">
        <Navbar
          curr={this.state.currencies}
          filterProduct={this.filterProduct}
          qty={this.props.addedItems.map(x=>x.quantity)}
        />
        <Routes>
          <Route exact path="/" element={<Category products={this.state.products} addToCart={this.props.addToCart}/>} />
          <Route path="/product" element={<Product products={this.state.products} addToCart={this.props.addToCart} />} />
          <Route exact path="/cart" element={<Cart/>} />
        </Routes>
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    items: state.items,
    currencies: state.currencies,
    addedItems: state.addedItems,
    total: state.total
    }
  }

const mapDispatchToProps= (dispatch)=>{
  return{
    addToCart: (id)=>{dispatch(addToCart(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)