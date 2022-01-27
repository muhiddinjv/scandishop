import React, { Component } from "react";
import { connect } from "react-redux";
import Helper from "./Helper";
import "../media/sass/CartMini.scss";
import CartMiniSlider from "./CartMiniSlider";
import {removeItem,addQuantity,subtractQuantity} from '../actions';

class CartMini extends Component {
  //to remove the item completely
  handleRemove = (id)=>{
    this.props.removeItem(id);
  }
  //to add to the quantity
  handleAddQuantity = (id)=>{
      this.props.addQuantity(id);
  }
  //to subtract from the quantity
  handleSubtractQuantity = (id)=>{
      this.props.subtractQuantity(id);
  }
  // add active class to size attribute
  sizeActive(item){
    for (const i of this.props.attrs) {            
      if (item.value.includes('#')) {if (item.value === i) return '25%'} 
      if (item.value === i) return 'active';
    }     
  }

  attributes(item) {        
    if (item.attributes.length > 1) { 
    return <div className="cartmini__attrs">
      <div className="cartmini__attr1">
        <div className="cartmini__attr--items">
          {item.attributes[0].items.map((it, i) => {
            if (it.value.includes("#")) {
              return (
                <div
                  key={i}
                  className="cartmini__attr--item" 
                  style={{ background: it.value, borderRadius:this.sizeActive(it) }}
                ></div>
              );
            } else {
              return (
                <div  className="cartmini__attr--item" >
                  {it.value}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="cartmini__attr2">
        <div className="cartmini__attr--items">
          {item.attributes[1].items.map((it, i) => {            
            return (
              <div key={i} className={`cartmini__attr--item ${this.sizeActive(it)}`} >
                {it.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>;
    } else {
      return <div className="cartmini__attr1">
        <div className="cartmini__attr--items">
          {item.attributes[0].items.map((it, i)=>{
            return <div key={i} className={`cartmini__attr--item ${this.sizeActive(it)}`}  >{it.value}</div>
          })}        
        </div>
      </div>
    }
  }

  render() {    
    let quantity = this.props.qty;
    let total = this.props.total;

    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {        
        return (
          <li className="cartmini__item" key={item.id}>
            <div className="cartmini__item--left">
              <div className="cartmini__item--header">
                <h5 className="cartmini__item--brand">{item.brand}</h5>
                <h5 className="cartmini__item--name">{item.name}</h5>
              </div>
              <b className="cartmini__item--price">
                {Helper.switchCurrency(item.prices[0].currency)}
                {item.prices[0].amount}
              </b>
              {this.attributes(item)}
            </div>

            <div className="cartmini__item--right">
              <div className="cartmini__item--buttons">
                <div className="cartmini__item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</div>
                <div className="cartmini__item--quantity">
                  <b>{item.quantity}</b>
                </div>
                <div className="cartmini__item--button" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</div>
              </div>
              <div className="cartmini__item--slider">
                <CartMiniSlider slides={item.gallery} />
                {/* <button className="cartmini__item--delete" onClick={()=>{this.handleRemove(item.id)}}>X</button> */}
              </div>
            </div>
          </li>
        );
      })
    ) : (
      <p className="cartmini__empty">The cart is empty</p>
    );
    
    return (      
      <div className="cartmini">
        <div className="cartmini__bg-layer">
          <div className="cartmini__dropdown">
            <h5 className="cartmini__page-name">my bag, {quantity} items</h5>
            <ul className="cartmini__items">{addedItems}</ul>
            <div style={{display: quantity === 0 ? 'none':'block'}}>
              <div className="cartmini__total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <div className="cartmini__btns" >
                <button className="cartmini__btn" onClick={()=>alert('Viewed the bag!')}>view bag</button>
                <button className="cartmini__btn" onClick={()=>alert('Checked out!')}>check out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
      items: state.addedItems,
      total: state.total,
      attrs: state.attr
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
      removeItem: (id)=>{dispatch(removeItem(id))},
      addQuantity: (id)=>{dispatch(addQuantity(id))},
      subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartMini)