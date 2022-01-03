import React, { Component } from "react";
import Slider from "./Slider";
import "../media/sass/Product.scss";



export default class Product extends Component {
  product() {
    let p = this.props.category[0];
    if (p) {
      console.log("prod",p.attributes[0].items.map(x=>x.value));
      return <div className="product__info">
      <header className="product__header">
        <h1 className="product__brand">{p.brand}</h1>
        <h3 className="product__name">{p.name}</h3>
      </header>
      <div className="product__attr">
        <h3 className="product__attr--title">{p.attributes[0].name}</h3>
        <div className="product__attr--items">
          {p.attributes[0].items.map(item=>{
            return <div className="product__attr--item" key={item.id} id={item.id}>{item.value}</div>
          })}   
        </div>
      </div>
      <div className="product__price">
        <h3 className="product__price--title">price</h3>
        <div className="product__price--amount">$50.00</div>
      </div>
      <button className="product__btn">add to cart</button>
      <div className="product__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nemo laborum sit cum! Reiciendis voluptatum nulla, numquam odit dicta rem eveniet fuga.</div>
    </div>
    } else {
      return <div className="loader"></div>;
    }
  }

  render() {
    return (
      <div className="product">
        <Slider images={this.props.category.map(img=>img.gallery)} />
        {this.product()}
      </div>
    );
  }
}
