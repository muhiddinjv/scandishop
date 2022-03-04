import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import LOAD_QUERY from "../Graphql/Query";
import { addToCart, setData } from '../Redux/Actions';
import ErrorBoundary from "./ErrorBoundary";

import { Navbar, Category, Product, Cart } from '../Components'

class App extends Component {
  state = { products: [], currencies:[] };

  componentDidMount() {
    // setTimeout(() => {
      this.changeCategory('');
    // });     
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
    this.setState({products: all.data.category.products})
    this.setState({currencies: all.data.currencies})
    this.props.setData(all.data)
  };
  
  render() {
    // console.log('state: ',this.state.products);
    const quantity = this.props.addedItems.map(x=>x.quantity).reduce((sum, a) => sum + a, 0);
    return (
      <main className="app">
        <ErrorBoundary>
          <Navbar
            changeCategory={this.changeCategory}
            curr={this.state.currencies}
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
  const {items, addedItems, total} = state;
  return {items, addedItems, total}
  }

const mapDispatchToProps= (dispatch)=>{
  return{
    addToCart: (id)=>{dispatch(addToCart(id))},
    setData: (items)=>{dispatch(setData(items))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)