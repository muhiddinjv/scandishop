import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import Helper from "../../Helpers/Helper";
import AddedItem from "./AddedItem";

class Cart extends Component {

  render() {
    const total = this.props.total;
    const items = this.props.addedItems;
    
    return (      
      <div className="cart">
        <h1 className="page-name">cart </h1>
        <ul className="items"><AddedItem sliderName='cart-slider' qty={this.props.qty}/></ul>
        <div className="total">{items.length < 1 ? "" : `Total: ${Helper.switchCurrency(this.props.selCurrency)}${total.toFixed(2)}`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { addedItems, total, selCurrency } = state;
  return { addedItems, total, selCurrency }
}

export default connect(mapStateToProps)(Cart)