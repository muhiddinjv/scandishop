import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import Helper from "../../Helpers/Helper";
import "./Category.scss";
import { ReactComponent as EmptyCart } from '../../Assets/icons/cart-white.svg';

class ProductCard extends Component {
  state = { display: "none"};

  mouseEnter = (e) => { 
    this.setState(() => ({
      display: "block",
    }));
   
  }

  mouseLeave = (e) => {
    this.setState(() => ({
      display: "none",
    }));
  }
  

  handleAddToCart = (id) =>{
    this.props.addToCart(id);
  }
  
  render() {
    const {product, selCurrency } = this.props;
    
    return (
      <li className="category__product--card" onMouseOver={this.mouseEnter.bind(this)} onMouseOut ={this.mouseLeave.bind(this)}>
        <div className="category__product--image-wrapper" >
          <NavLink to="/product">
            <img
              className="category__product--image"
              src={product.gallery[0]}
              alt={product.name}
            />
          </NavLink>
          <div  onClick={()=>{this.handleAddToCart(product.id)}} className="category__product--cart" 
          style={{display: this.state.display}} >
          <NavLink to="/cart">
            <EmptyCart />
          </NavLink>
          </div>
        </div>           
        <div  className="category__product--body">
          <h2  className="category__product--name">
            <NavLink to="/product">{product.name}</NavLink>
          </h2>
          <div  className="category__product--price">
            {Helper.switchCurrency(selCurrency)}
            {/* {Helper.switchAmount(selCurrency, product.prices)} */}
          </div>
        </div>
      </li>
    );
  }
}


class Category extends Component {
  render() {
    const { products } = this.props.category;

    return (
      <div className="category">
        <div className="category__header">
          <h1 className="category__name"> 
            {this.props.category.name}
          </h1>
        </div>
        <ul className="category__product">
          {products?.map((product, i) => {
            return <ProductCard product={product} key={i} />
          })}
        </ul>
      </div>
    )
  }
}


const mapStateToProps = state => {    
  const { selCurrency } = state;
  return { selCurrency }
}

export default connect(mapStateToProps)(Category);