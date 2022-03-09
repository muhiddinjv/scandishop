import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Helper from "../../Helpers/Helper";
import "./Category.scss";
import { ReactComponent as EmptyCart } from "../../Assets/icons/cart-white.svg";

export default class ProductCard extends Component {

  render() {
    const { product, selCurrency, onAddToCart, selectProduct } = this.props;
    
    return (
      <li className="category__product--card">
        <div className="category__product--image-wrapper">

          <NavLink to="/product">
            <img className="category__product--image"
              onClick={()=>selectProduct(product.id)}
              src={product.gallery[0]}
              alt={product.name} />
          </NavLink>

          <div onClick={() => onAddToCart(product.id)}
            className="category__product--cart show-cart">
            <NavLink to="/cart">
              <EmptyCart />
            </NavLink>
          </div>

        </div>
        <div className="category__product--body">
          <h2 className="category__product--name">
            <NavLink to="/product">{product.name}</NavLink>
          </h2>

          <div className="category__product--price">
            {Helper.switchCurrency(selCurrency)}
            {Helper.switchAmount(selCurrency, product.prices)}
          </div>
        </div>
      </li>
    );
  }
}
