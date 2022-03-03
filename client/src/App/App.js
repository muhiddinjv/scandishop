import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
// import axios from 'axios';
import LOAD_QUERY from "../Graphql/Query";
import { addToCart, changeCategory } from '../Redux/Actions';
import ErrorBoundary from "./ErrorBoundary";

import { Navbar, Category, Product, Cart } from '../Components'

class App extends Component {
  constructor(props) {
    super(props);
    this.filterProduct = this.filterProduct.bind(this);
    this.state = { products: [], currencies:[], items: [], selectedItem: [] };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({products: [this.props.items[0]]}) 
      this.setState({currencies: this.props.currencies}) 
      this.changeCategory('');
    }, 500);     
  }

  changeCategory = async (title) => {
   const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: LOAD_QUERY,
        variables: { input: { title } },
      }),
    })
    const data = await response.json();
    console.log(data.data.category.products);
      // .then((res) => res.json())
      // .then(data=>console.log(data.data.category.products))
      // .then((data) => {
      //   data.data.category.products.map((ps) => initState.items.push(ps));
      //   data.data.currencies.map((c) => initState.currencies.push(c));
      // })
      // .catch((error) => console.log(error));
  };

  filterProduct = (productId) => {
    const items = this.props.items;
    items.filter((p) => p.id === productId ? this.setState({ products: [p] }) : <div className="loader"/>)    
  };
  
  render() {
    // console.log('render: ',this.props.items);
    const quantity = this.props.addedItems.map(x=>x.quantity).reduce((sum, a) => sum + a, 0);
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar
            changeCategory={this.changeCategory}
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
    addToCart: (id)=>{dispatch(addToCart(id))},
    changeCategory: (categoryName)=>{dispatch(changeCategory(categoryName))}

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)