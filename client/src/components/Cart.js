import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helper from "./Helper";
import "../media/sass/Cart.scss";

class Cart extends Component {
  attributes() {
    const item = this.props.items[0];

    if (item.attributes.length > 1) { 
    <div className="item__attrs">
      <div className="product__attr1">
        <h3 className="product__attr--title">{item.attributes[0].name}</h3>
        <div className="product__attr--items">
          {item.attributes[0].items.map((it, i) => {
            if (it.value.includes("#")) {
              return (
                <div
                  key={i}
                  className="product__attr--item"
                  style={{ background: it.value }}
                  id={it.id}
                ></div>
              );
            } else {
              return (
                <div className="product__attr--item" id={it.id}>
                  {it.value}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="product__attr2">
        <h3 className="product__attr--title">{item.attributes[1].name}</h3>
        <div className="product__attr--items">
          {item.attributes[1].items.map((it, i) => {
            return (
              <div key={i} className="product__attr--item" id={it.id}>
                {it.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>;
    } else {
      return <div className="product__attr1">
        <h3 className="product__attr--title">{item.attributes[0].name}</h3>
        <div className="product__attr--items">
          {item.attributes[0].items.map((it, i)=>{
            return <div key={i} className="product__attr--item" id={it.id}>{it.value}</div>
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
            <h3 className="cart__item--brand">{item.brand}</h3>
            <h4 className="cart__item--name">{item.name}</h4>
            <div className="cart__item--price">
              {Helper.switchCurrency(item.prices[0].currency)}
              {item.prices[0].amount}
            </div>
            <div className="cart__item--image" style={{ width: "200px" }}>
              <img src={item.gallery[0]} alt={item.name} />
            </div>

            <div className="item-desc">
              <div className="add-remove">
                <Link to="/cart">
                  <i className="material-icons" style={{ fontSize: "22px" }}>
                    +
                  </i>
                </Link>
                <p>
                  <b>{item.quantity}</b>
                </p>
                <Link to="/cart">
                  <i className="material-icons" style={{ fontSize: "22px" }}>
                    -
                  </i>
                </Link>
              </div>
              <button className="waves-effect waves-light btn pink remove">
                del
              </button>
            </div>
            {this.attributes()}
          </li>
        );
      })
    ) : (
      <p>The cart is empty</p>
      // <div className="loader" key="loader"></div>
    );
    return (
      <div className="cart">
        <h1 className="cart__page">Cart </h1>
        <ul className="cart__items">{addedItems}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
  };
};

export default connect(mapStateToProps)(Cart);
