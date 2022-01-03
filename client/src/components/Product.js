import React, { Component } from "react";
import Slider from "./Slider";
import "../media/sass/Product.scss";



export default class Product extends Component {

  render() {
    return (
      <div className="product">
        <Slider images={this.props.category.map(img=>img.gallery)} />
        <div className="product__info">
          <header className="product__header">
            <h1 className="product__title">Apollo</h1>
            <h3 className="product__subtitle">Running Short</h3>
          </header>
          <div className="product__attr">
            <h3 className="product__attr--title">size</h3>
            <div className="product__attr--sizes">
              <div className="product__attr--size">xs</div>
              <div className="product__attr--size">s</div>
              <div className="product__attr--size">m</div>
              <div className="product__attr--size">l</div>
            </div>
          </div>
          <div className="product__price">
            <h3 className="product__price--title">price</h3>
            <div className="product__price--amount">$50.00</div>
          </div>
          <button className="product__btn">add to cart</button>
          <div className="product__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nemo laborum sit cum! Reiciendis voluptatum nulla, numquam odit dicta rem eveniet fuga.</div>
        </div>
      </div>
    );
  }
}
