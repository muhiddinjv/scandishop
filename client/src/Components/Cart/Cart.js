import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import Helper from "../../Helpers";
import AddedItem from "./AddedItem";

class Cart extends PureComponent {

  render() {
    const {total, selCurrency} = this.props;  

    return (      
      <div className="cart">
        <h1 className="cart__page-name">cart </h1>
        <ul className="cart__items"><AddedItem sliderName='cart-slider'/></ul>
        <div className="cart__total">{total < 1 ? "" : `Total: ${Helper.switchCurrency(selCurrency)}${total.toFixed(2)}`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { total, selCurrency } = state;
  return { total, selCurrency }
}

export default connect(mapStateToProps)(Cart)