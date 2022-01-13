import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Helper from "./Helper";
import "../media/sass/Cart.scss";
import CartSlider from "./CartSlider";
import { removeItem,addQuantity,subtractQuantity} from '../redux/actions/cartActions';

class Cart extends Component {
  //to remove the item completely
  handleRemove = (id)=>{
    this.props.removeItem(id);
  }
  //to add the quantity
  handleAddQuantity = (id)=>{
      this.props.addQuantity(id);
  }
  //to substruct from the quantity
  handleSubtractQuantity = (id)=>{
      this.props.subtractQuantity(id);
  }

  attributes() {
    const item = this.props.items[0];

    if (item.attributes.length > 1) { 
    <div className="item__attrs">
      <div className="cart__attr1">
        <div className="cart__attr--items">
          {item.attributes[0].items.map((it, i) => {
            if (it.value.includes("#")) {
              return (
                <div
                  key={i}
                  className="cart__attr--item"
                  style={{ background: it.value }}
                  id={it.id}
                ></div>
              );
            } else {
              return (
                <div className="cart__attr--item" id={it.id}>
                  {it.value}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="cart__attr2">
        <div className="cart__attr--items">
          {item.attributes[1].items.map((it, i) => {
            return (
              <div key={i} className="cart__attr--item" id={it.id}>
                {it.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>;
    } else {
      return <div className="cart__attr1">
        <div className="cart__attr--items">
          {item.attributes[0].items.map((it, i)=>{
            return <div key={i} className="cart__attr--item" id={it.id}>{it.value}</div>
          })}        
        </div>
      </div>
    }
  }

  render() {

    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {        
        return (
          <li className="cart__item" key={item.id}>
            <div className="cart__item--left">
              <div className="cart__item--header">
                <h3 className="cart__item--brand">{item.brand}</h3>
                <h4 className="cart__item--name">{item.name}</h4>
              </div>
              <b className="cart__item--price">
                {Helper.switchCurrency(item.prices[0].currency)}
                {item.prices[0].amount}
              </b>
              {this.attributes()}
            </div>

            <div className="cart__item--right">
              <div className="cart__item--buttons">
                <Link to="/cart" className="cart__item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</Link>
                <div className="cart__item--quantity">
                  <b>{item.quantity}</b>
                </div>
                <Link to="/cart" className="cart__item--button" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</Link>
              </div>
              <div className="cart__item--slider">
                <CartSlider slides={item.gallery} />
                <button className="cart__item--delete" onClick={()=>{this.handleRemove(item.id)}}>X</button>
              </div>
            </div>
          </li>
        );
      })
    ) : (
      <p className="cart__empty">The cart is empty</p>
    );
    
    return (      
      <div className="cart">
        <h1 className="cart__page-name">cart </h1>
        <ul className="cart__items">{addedItems}</ul>
        <div className="cart__total">{this.props.total === 0 ? "" : `Total: ${this.props.total}$`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
      items: state.addedItems,
      total: state.total
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
      removeItem: (id)=>{dispatch(removeItem(id))},
      addQuantity: (id)=>{dispatch(addQuantity(id))},
      subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)