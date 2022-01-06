import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Product from "./components/Product"; 
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';

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
          <Route exact path="/" element={<Category products={this.state.products} />} />
          <Route path="/product" element={<Product products={this.state.products} />} />
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

export default connect(mapStateToProps)(App)