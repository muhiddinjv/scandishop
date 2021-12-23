import React, { Component } from "react";
import "../media/sass/Category.scss";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {category: ""};
  }

  componentDidMount() {    
    setTimeout(() => {
      this.setState({category: this.props.state})
    },500)
  }

  generateProduct = () => {    
    let products = this.state.category.products;
    
    if (products) {
      return products.map((product) => {     
        // console.log(product.gallery, product.prices[0].amount, product.prices[0].currency);                    
        return <li className="category__product--card" key={product.id}>
          <figure className="category__product--figure">
            <img className="category__product--image" src={product.gallery[0]} alt={product.name}/>
          </figure>
          <div className="category__product--body">
            <h2 className="category__product--name">{product.name}</h2>
            <div className="category__product--price">
              {product.prices[0].currency}, {product.prices[0].amount}
            </div>
          </div>
        </li>
      });
    } else {
      return <div className="loader"></div>
    }
  };

  render() {      
    return (
      <div className="category">
        <div className="category__header">
          {/* <h1 className="category__name">{this.state.category.name ? this.state.category.name : "loading..."}</h1> */}
          <h1 className="category__name">{this.state.category.name}</h1>
        </div>
          <ul className="category__product">{this.generateProduct()}</ul>
      </div>
    );
  }
}
