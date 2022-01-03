import React, { Component } from "react";
import Carousel from "./Carousel";
// import "../media/sass/Carousel.scss";



export default class Product extends Component {

  render() {
    return (
      <div className="product">
        <div className="product__carousel">
        <Carousel images={this.props.category.map(img=>img.gallery)} />
        </div>
      </div>
    );
  }
}
