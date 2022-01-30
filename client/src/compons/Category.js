import React, { Component } from "react";
import Helper from "./Helper";
import "../media/sass/Category.scss";
import { NavLink } from "react-router-dom";
import { ReactComponent as EmptyCart } from '../media/icons/cart-white.svg';
import { connect } from 'react-redux';
import { addImages } from '../actions';


class Category extends Component {
  constructor(props) {
    super(props);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.state = {
      display: "none",
    };
  }

  mouseEnter() {    
    this.setState(() => ({
      display: "block",
    }));
  }

  mouseLeave() {
    this.setState(() => ({
      display: "none",
    }));
  }

  handleClick = (id)=>{
    this.props.addToCart(id);
  }
  

  generateProduct() {
    let products = this.props.products;
        
    if (products) {
      return products.map((product, i) => {  
        // let price = this.props.price;
        // let amount = product.prices[0].amount;
        console.log('price: ',this.props.selCurrency);
        

        return (
          <li className="category__product--card" key={i} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <div className="category__product--image-wrapper" >
              <NavLink to="/product">
                <img onClick={()=>{this.props.addImages(product.gallery)}}
                  className="category__product--image"
                  src={product.gallery[0]}
                  alt={product.name}
                />
              </NavLink>
              <div  onClick={()=>{this.handleClick(product.id)}} className="category__product--cart" style={{display: this.state.display}} >
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
                {Helper.switchCurrency(this.props.selCurrency)}
                {Helper.switchAmount(this.props.selCurrency, product.prices)}
                {/* {price.length === 0 ? amount : price} */}
              </div>
            </div>
          </li>
        );
      });
    } else {
      return <div className="loader"></div>;
    }
  };

  render() {
    return (
      <div className="category">
        <div className="category__header">
          <h1 className="category__name">
            {this.props.products.map((x) => x.category)}
          </h1>
        </div>
        <ul className="category__product">{this.generateProduct()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {    
  const {images, price, selCurrency } = state;
  return { images, price, selCurrency   }
}

export default connect(mapStateToProps,{addImages})(Category);