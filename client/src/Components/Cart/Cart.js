import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import Helper from "../../Helpers/Helper";
import AddedItem from "./AddedItem";

class Cart extends Component {

  render() {
    const {total, addedItems} = this.props;
    
    return (      
      <div className="cart">
        <h1 className="cart__page-name">cart </h1>
        <ul className="cart__items"><AddedItem sliderName='cart-slider' qty={this.props.qty}/></ul>
        <div className="cart__total">{addedItems.length < 1 ? "" : `Total: ${Helper.switchCurrency(this.props.selCurrency)}${total.toFixed(2)}`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { addedItems, total, selCurrency } = state;
  return { addedItems, total, selCurrency }
}

export default connect(mapStateToProps)(Cart)