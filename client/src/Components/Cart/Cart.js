import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Cart.scss";
import Helper from "../../Helpers/Helper";
import CartSlider from "./CartSlider";
import { removeItem,addQuantity,subtractQuantity} from '../../Redux/Actions';

class Cart extends Component {
  handleRemove = (id)=>{
    this.props.removeItem(id);
  }

  handleAddQuantity = (id)=>{
      this.props.addQuantity(id);
  }

  handleSubtractQuantity = (id)=>{
      this.props.subtractQuantity(id);
  }

  sizeActive(item){
    for (const i of this.props.attributes) {            
      if (item.value.includes('#')) {if (item.value === i) return '25%'} 
      if (item.value === i) return 'active';
    }     
  }

  attributes(item) {        
    if (item.attributes.length > 1) { 
    return <div className="item__attrs">
      <div className="cart__attr1">
        <div className="cart__attr--items">
          {item.attributes[0].items.map((it, i) => {
            if (it.value.includes("#")) {
              return (
                <div
                  key={i}
                  className="cart__attr--item" 
                  style={{ background: it.value, borderRadius:this.sizeActive(it) }}
                ></div>
              );
            } else {
              return (
                <div  className="cart__attr--item" >
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
              <div key={i} className={`cart__attr--item ${this.sizeActive(it)}`} >
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
            return <div key={i} className={`cart__attr--item ${this.sizeActive(it)}`}  >{it.value}</div>
          })}        
        </div>
      </div>
    }
  }

  render() {
    let total = this.props.total;
    let items = this.props.addedItems;

    let addedItem = items.length ? (
      items.map((item) => {        
        return (
          <li className="cart__item" key={item.id}>
            <div className="cart__item--left">
              <div className="cart__item--header">
                <h3 className="cart__item--brand">{item.brand}</h3>
                <h4 className="cart__item--name">{item.name}</h4>
              </div>
              <b className="cart__item--price">
                {Helper.switchCurrency(this.props.selectedCurrency)}
                {Helper.switchAmount(this.props.selectedCurrency, item.prices)}
              </b>
              {this.attributes(item)}
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
        <ul className="cart__items">{addedItem}</ul>
        <div className="cart__total">{items.length < 1 ? "" : `Total: ${Helper.switchCurrency(this.props.selectedCurrency)}${total.toFixed(2)}`}</div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { addedItems, total, attributes, selectedCurrency } = state;
  return { addedItems, total, attributes, selectedCurrency }
}

const mapDispatchToProps = (dispatch)=>{
  return{
      removeItem: (id)=>{dispatch(removeItem(id))},
      addQuantity: (id)=>{dispatch(addQuantity(id))},
      subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)