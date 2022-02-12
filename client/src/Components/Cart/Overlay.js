import React, { Component } from "react";
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import "./Overlay.scss";
import OverlaySlider from "./OverlaySlider";
import {addQuantity,subtractQuantity} from '../../Redux/Actions';

class Overlay extends Component {

  handleAddQuantity=(id)=>{this.props.addQuantity(id)}
  handleSubtractQuantity=(id)=>{this.props.subtractQuantity(id)}

  createAttributes(item) {        
    if (item.attributes.length > 1) { 
    return <div className="overlay__attrs">

      <div className="overlay__attr1">
        <div className="overlay__attr--items">
          {item.attributes[0].items.map((it, i) => {
            if (it.value.includes("#")) {
              return (
                <div
                  key={i}
                  className="overlay__attr--item" 
                  style={{ background: it.value, borderRadius:Helper.addActiveClass(it,item.attributes[0]) }}
                ></div>
              );
            } else {
              return (
                <div  className="overlay__attr--item" >
                  {it.value}
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="overlay__attr2">
        <div className="overlay__attr--items">
          {item.attributes[1].items.map((it, i) => {            
            return (
              <div key={i} className={`overlay__attr--item ${Helper.addActiveClass(it,item.attributes[1])}`} >
                {it.value}
              </div>
            );
          })}
        </div>
      </div>

    </div>;
    } else {
      return <div className="overlay__attr1">
        <div className="overlay__attr--items">
          {item.attributes[0].items.map((it, i)=>{
            return <div key={i} className={`overlay__attr--item ${Helper.addActiveClass(it,item.attributes[0])}`}  >{it.value}</div>
          })}        
        </div>
      </div>
    }
  }

  render() {    
    let quantity = this.props.qty;
    let total = this.props.total;
    let items = this.props.addedItems;
    let currency = this.props.selCurrency;    

    let addedItems = items.length ? (
      items.map((item) => {        
        return (
          <li className="overlay__item" key={item.id}>

            <div className="overlay__item--left">
              <div className="overlay__item--header">
                <h5 className="overlay__item--brand">{item.brand}</h5>
                <h5 className="overlay__item--name">{item.name}</h5>
              </div>
              <b className="overlay__item--price">
                {Helper.switchCurrency(currency)}
                {Helper.switchAmount(currency, item.prices)}
              </b>
              {this.createAttributes(item)}
            </div>

            <div className="overlay__item--right">
              <div className="overlay__item--buttons">
                <div className="overlay__item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</div>
                <div className="overlay__item--quantity">
                  <b>{item.quantity}</b>
                </div>
                <div className="overlay__item--button" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</div>
              </div>
              <div className="overlay__item--slider">
                <OverlaySlider slides={item.gallery} />
              </div>
            </div>

          </li>
        );
      })
    ) : (
      <p className="overlay__empty">The cart is empty</p>
    );

    return (      
      <div className="overlay">
        <div className="overlay__background" onClick={()=>this.props.showOverlay()}></div>

        <div className="overlay__dropdown">
          <h5 className="overlay__page-name">my bag, {quantity} items</h5>
          <ul className="overlay__items">{addedItems}</ul>

          <div style={{display: quantity === 0 ? 'none':'block'}}>
            <div className="overlay__total">
              <span>Total:</span>
              <span>{Helper.switchCurrency(currency)}{total.toFixed(2)}</span>
            </div>
            <div className="overlay__btns" >
              <button className="overlay__btn" onClick={()=>alert('Viewed the bag!')}>view bag</button>
              <button className="overlay__btn" onClick={()=>alert('Checked out!')}>check out</button>
            </div>
          </div>
          
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { addedItems, total, selCurrency } = state;
  return{ addedItems, total, selCurrency }
}

const mapDispatchToProps = (dispatch)=>{
  return{
      addQuantity: (id)=>{dispatch(addQuantity(id))},
      subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Overlay)