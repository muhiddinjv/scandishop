import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Product from "./components/Product";
// import LOAD_QUERY from "./graphql/Query";
import LOAD_PRODUCT from "./graphql/Products";
import { Routes, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.filterProduct = this.filterProduct.bind(this);
    this.state = {
      // loading:true,
      allData: [],
      category: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: LOAD_PRODUCT }),
    })
      .then((res) => res.json())
      .then((data) => {
        // this.setState({loading:true});
        this.setState({ allData: data.data });
        this.setState({ category: [data.data.categories[0].products[0]] });
        // this.setState({loading:false});
      })
      .catch((error) => console.log(error));
      //   if(this.state.loading){
      //     return <h1>Loading...</h1>
      //  }
  };

  filterProduct = (productId) => {
    const cats = this.state.allData.categories;

    cats.map((c) =>
      c.products.filter((p) => {
        return p.id === productId ? this.setState({ category: [p] }) : null;
      })
    );
  };

  render() {
    console.log("render", this.state.category);
    return (
      <div className="app">
        <Navbar
          curr={this.state.allData.currencies}
          filterProduct={this.filterProduct}
        />
        <Routes>
          <Route exact path="/" element={<Category category={this.state.category} />} />
          <Route path="/product" element={<Product category={this.state.allData} />} />
        </Routes>
      </div>
    );
  }
}
