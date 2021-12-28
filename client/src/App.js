import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
// import LOAD_QUERY from "./graphql/Query";
import LOAD_PRODUCT from "./graphql/Products";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.filterProduct = this.filterProduct.bind(this);
    this.state = {
      allData: [],
      category: [],
    };
  }

  componentDidMount(){this.fetchData()}

  fetchData = () => {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: LOAD_PRODUCT }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ allData: data.data });
        this.setState({ category: data.data.categories[0]});
        console.log("fetch", data.data);
      })
      .catch((error) => console.log(error));
  };

  filterProduct = (catName) => {
    const cats = this.state.allData.categories;    
    const updatedList = cats.filter((cat) => cat.name === catName);
    this.setState({category: updatedList[0]})    
  };

  render() {
    console.log("render",this.state.category);
    
    return (
      <div className="app">
        <Navbar
          curr={this.state.allData.currencies}
          filterProduct={this.filterProduct}
        />
        <Category category={this.state.category.products} />
      </div>
    );
  }
}
