import React, { Component } from "react";
import Helper from "../../Helpers/Helper";
import "./Category.scss";
import { NavLink } from "react-router-dom";
import { ReactComponent as EmptyCart } from '../../Assets/icons/cart-white.svg';
import { connect } from 'react-redux';
// import { addImages } from '../../Redux/Actions';


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
    };
  }

  mouseEnter = () => {    
    this.setState(() => ({
      display: "block",
    }));
  }

  mouseLeave = () => {
    this.setState(() => ({
      display: "none",
    }));
  }

  handleClick = (id) =>{
    this.props.addToCart(id);
  }
  

  generateProduct() {
    let products = this.props.products;
        
    if (products) {
      return products.map((product, i) => {         
        return (
          <li className="category__product--card" key={i} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <div className="category__product--image-wrapper" >
              <NavLink to="/product">
                <img
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
                {Helper.switchCurrency(this.props.selectedCurrency)}
                {Helper.switchAmount(this.props.selectedCurrency, product.prices)}
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
  const { selectedCurrency } = state;
  return { selectedCurrency }
}

export default connect(mapStateToProps)(Category);