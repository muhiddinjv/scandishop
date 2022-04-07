import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import Helper from "../../Helpers/Helper";
import AddedItem from "./AddedItem";

class Cart extends PureComponent {

  render() {
    const {total} = this.props;  
    const p = this.props.products[0];

    return (      
      <div className="cart">
        <h1 className="cart__page-name">cart </h1>
        <ul className="cart__items"><AddedItem selProducts={p} sliderName='cart-slider' qty={this.props.qty} /></ul>
        <div className="cart__total">{total === 0 ? "" : `Total: ${Helper.switchCurrency(this.props.selCurrency)}${total.toFixed(2)}`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { total, selCurrency } = state;
  return { total, selCurrency }
}

export default connect(mapStateToProps)(Cart)