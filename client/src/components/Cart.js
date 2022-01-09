import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helper from "./Helper";
import "../media/sass/Cart.scss";
import CartSlider from "./CartSlider";


class Cart extends Component {
  attributes() {
    const item = this.props.items[0];

    if (item.attributes.length > 1) { 
    <div className="item__attrs">
      <div className="cart__attr1">
        {/* <h3 className="cart__attr--title">{item.attributes[0].name}</h3> */}
        <div className="cart__attr--items">
          {item.attributes[0].items.map((it, i) => {
            if (it.value.includes("#")) {
              return (
                <div
                  key={i}
                  className="cart__attr--item"
                  style={{ background: it.value }}
                  id={it.id}
                ></div>
              );
            } else {
              return (
                <div className="cart__attr--item" id={it.id}>
                  {it.value}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="cart__attr2">
        {/* <h3 className="cart__attr--title">{item.attributes[1].name}</h3> */}
        <div className="cart__attr--items">
          {item.attributes[1].items.map((it, i) => {
            return (
              <div key={i} className="cart__attr--item" id={it.id}>
                {it.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>;
    } else {
      return <div className="cart__attr1">
        {/* <h3 className="cart__attr--title">{item.attributes[0].name}</h3> */}
        <div className="cart__attr--items">
          {item.attributes[0].items.map((it, i)=>{
            return <div key={i} className="cart__attr--item" id={it.id}>{it.value}</div>
          })}        
        </div>
      </div>
    }
  }

  render() {
    // this.props.items.map((i) => console.log("attr", i.attributes.length));

    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <li className="cart__item" key={item.id}>
            <div className="cart__item--left">
              <div className="cart__item--header">
                <h3 className="cart__item--brand">{item.brand}</h3>
                <h4 className="cart__item--name">{item.name}</h4>
              </div>
              <b className="cart__item--price">
                {Helper.switchCurrency(item.prices[0].currency)}
                {item.prices[0].amount}
              </b>
              {this.attributes()}
            </div>

            <div className="cart__item--right">
              <div className="cart__item--buttons">
                <Link to="/cart" className="cart__item--button">+</Link>
                <div className="cart__item--quantity">
                  <b>{item.quantity}</b>
                </div>
                <Link to="/cart" className="cart__item--button">-</Link>
              </div>
              {/* <button className="cart__item--delete remove">del</button> */}
              <img className="cart__item--image" src={item.gallery[0]} alt={item.name} />
            </div>
          </li>
        );
      })
    ) : (
      <p>The cart is empty</p>
      // <div className="loader" key="loader"></div>
    );
    this.props.items.map(x=>x.gallery)
    
    return (      
      <div className="cart">
        <h1 className="cart__page-name">cart </h1>
        <ul className="cart__items">{addedItems}</ul>
        <CartSlider slides={this.props.items.map(x=>x.gallery)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: state.addedItems, };
};

export default connect(mapStateToProps)(Cart);
