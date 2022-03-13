import React, { Component } from 'react'
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import Slider from "./Slider";
import CartAttributes from "./CartAttributes";
import { removeItem, addQuantity, subtractQuantity} from '../../Redux/Actions';

class AddedItem extends Component {
  handleRemove = (id)=>{
    this.props.removeItem(id);
  }

  handleAddQuantity = (id)=>{
    this.props.addQuantity(id);
  }

  handleSubtractQuantity = (id)=>{
    this.props.subtractQuantity(id);
  }

  handleAttribute = (added) => {
    const ind = added.attributes.length > 1 ? 1 : 0;
    return (
      <>
        {added.attributes[ind]?.items.map((attribute, index) => {
          if (attribute.value.includes("#")) {
            return (<div key={index} className="attr--item" style={{background: attribute.value}}/>);
          } else {
            return (<div key={index} className={`attr--item ${Helper.addActiveClass(attribute,added.attributes[ind])}`}>{attribute.value}</div>)
          }
        })}
      </>
    );
  }

  createAttributes(item) {  
    // console.clear();
    // console.log(item.attributes);
    if (item.attributes.length > 1) { 
    return <div className="attrs">
        {/* <div className="attr--items">
          {item.attributes[0].items.map((attribute, index) => 
            Helper.setBorderRadius(attribute, index, item)
          )}
        </div> */}

        <div className="attr--items">
          {item.attributes.map((attribute, index) => {
            return <CartAttributes key={index}
            product={item}
            attributes={attribute?.items}
          />})}
        </div>
    </div>;
    } else {
      return <div className="attr--items">
          {/* {this.handleAttribute(item)} */}
          {item.attributes.map((attribute, index) => {
            return <CartAttributes key={index}
            product={item}
            attributes={attribute?.items}
          />})}
        </div>
    }
  }
  
  render() {
    const {sliderName, addedItems, selCurrency} = this.props;
    
    const addedItem = addedItems.length ? (
      addedItems.map((item,index) => {        
        const deleteButton = <button className="item--delete" onClick={()=>{this.handleRemove(item.id)}}>X</button>
        return (
          <li className="item" key={index}>
            <div className="item--left">
              <div className="item--header">
                <h5 className="item--brand">{item.brand}</h5>
                <h5 className="item--name">{item.name}</h5>
              </div>
              <b className="item--price">
                {Helper.switchCurrency(selCurrency)}
                {Helper.switchAmount(selCurrency, item.prices)}
              </b>
              {this.createAttributes(item)}
            </div>

            <div className="item--right">
              <div className="item--buttons">
                <div to="/cart" className="item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</div>
                <div className="item--quantity">
                  <b>{item.quantity}</b> 
                </div>
                <div className="item--button" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</div>
              </div>
              <div className="item--slider">
                <Slider sliderName={sliderName} slides={item.gallery} />
                {sliderName === 'cart-slider' && deleteButton}
              </div>
            </div>

          </li>
        );
      })
    ) : (
      <p className="empty">The cart is empty</p>
    );
    return (
      <>{addedItem}</>
    )
  }
}

const mapStateToProps = (state)=>{
    const { addedItems, selCurrency } = state;
    return{ addedItems, selCurrency }
  }
  
export default connect(mapStateToProps,{removeItem, addQuantity, subtractQuantity})(AddedItem)
