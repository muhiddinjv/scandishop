import React, { Component } from "react";
import Slider from "./Slider";
import Helper from "./Helper";
import "../media/sass/Product.scss";

export default class Product extends Component {
  attributes(){
    let p = this.props.category[0];
    
    if (p.attributes.length > 1) {            
      return <div className="product__attrs">
        <div className="product__attr1">
          <h3 className="product__attr--title">{p.attributes[0].name}</h3>
          <div className="product__attr--items">
            {p.attributes[0].items.map(item=>{
              console.log("item value",item.value);
              if (item.value.includes("#")){
                return <div className="product__attr--item" style={{background: item.value}} key={item.id} id={item.id}></div>
              } else {
                return <div className="product__attr--item" key={item.id} id={item.id}>{item.value}</div>
              }
            })}        
          </div>
        </div>
        <div className="product__attr2">
          <h3 className="product__attr--title">{p.attributes[1].name}</h3>
          <div className="product__attr--items">
            {p.attributes[1].items.map(item=>{
                return <div className="product__attr--item" key={item.id} id={item.id}>{item.value}</div>
              })}
          </div>
        </div>
      </div>
    } else {
      return <div className="product__attr1">
        <h3 className="product__attr--title">{p.attributes[0].name}</h3>
        <div className="product__attr--items">
          {p.attributes[0].items.map(item=>{
            return <div className="product__attr--item" key={item.id} id={item.id}>{item.value}</div>
          })}        
        </div>
      </div>
    }
  }

  product() {
    let p = this.props.category[0];

    if (p) {            
      return <div className="product__info">
      <header className="product__header">
        <h1 className="product__brand">{p.brand}</h1>
        <h3 className="product__name">{p.name}</h3>
      </header>
      {this.attributes()}
      <div className="product__price">
        <h3 className="product__price--title">price</h3>
        <div className="product__price--amount">{Helper.switchCurrency(p.prices[0].currency)}{p.prices[0].amount}</div>
      </div>
      <button className="product__btn">add to cart</button>
      <div className="product__desc" dangerouslySetInnerHTML={{ __html: p.description }}></div>
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
