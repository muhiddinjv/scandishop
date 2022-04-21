import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import Helper from "../../Helpers";
import "./Category.scss";
import { ReactComponent as EmptyCart } from "../../Assets/icons/cart-white.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default class ProductCard extends PureComponent {
  outOfStock = (inStock) => {
    return !inStock && <div className="out-of-stock">out of stock</div>
  }

  render() {
    const { product, selCurrency, selectProduct } = this.props;
    
    return (
      <li className={`category__product--card ${product.inStock && 'hover-on'}`}>
        {this.outOfStock(product.inStock)}
        <div className="category__product--image-wrapper">
          <LazyLoadImage effect="blur" className="category__product--image" src={product.gallery[0]} alt={product.name} onError={Helper.addDefaultSrc}/>
          <NavLink to="/product">
            <div onClick={()=>selectProduct(product.id)}
              className="category__product--cart show-cart">
                <EmptyCart />
            </div>
          </NavLink>

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