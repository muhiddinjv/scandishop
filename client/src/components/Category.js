import React, { Component } from "react";
import "../media/sass/Category.scss";

export default class Category extends Component {
  generateProduct = () => {    
    let products = this.props.category;
    
      if (products) {
        return products.map((product) => {   
          // console.log(product.gallery, product.prices[0].amount, product.prices[0].currency);                    
          return <li className="category__product--card" key={product.id}>
            <img className="category__product--image" src={product.gallery[0]} alt={product.name}/>
            <div className="category__product--body">
              <h2 className="category__product--name">{product.name}</h2>
              <div className="category__product--price">
                {product.prices[0].currency} {product.prices[0].amount}
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
          <h1 className="category__name">{this.props.name}</h1>
        </div>
          <ul className="category__product">{this.generateProduct()}</ul>
      </div>
    );
  }
}
