import React, { Component } from "react";
import Slider from "./Slider";
import "../media/sass/Product.scss";



export default class Product extends Component {

  render() {
    return (
      <div className="product">
        <div className="product__slider">
          <Slider images={this.props.category.map(img=>img.gallery)} />
        </div>
      </div>
    );
  }
}
