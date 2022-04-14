import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import Slider from "./Slider";
import { removeItem, addQuantity, subtractQuantity} from '../../Redux/Actions';

class AddedItem extends PureComponent {
  handleRemove = (id, prices)=>{
    this.props.removeItem(id, prices);
  }

  handleAddQuantity = (id, prices)=>{
    this.props.addQuantity(id, prices);
  }

  handleSubtractQuantity = (id, prices)=>{
    this.props.subtractQuantity(id, prices);
  }

  setActiveOrRoundBorder = (item, value) =>{
    const includesHash = item.value.includes("#");
    if (item.value === value && !includesHash) return 'active';
    if (item.value === value && includesHash) return 'round-border';
  }

  render() {
    const {sliderName, selCurrency, cart} = this.props;
    const products = Object.values(cart);
        
    const addedItem = products.length ? (
      products.map((item, ind) => { 
        
        return (
          item.addedAttrs.map((attr,i) => 
          {
            const deleteButton = <button className="item--delete" onClick={()=>{this.handleRemove(attr.id, item.prices)}}>X</button>
            return <li className="item" key={i}>
            <div className="item--left">
              <div className="item--header">
                <h5 className="item--brand">{item.brand}</h5>
                <h5 className="item--name">{item.name}</h5>
              </div>
              <b className="item--price">
                {Helper.switchCurrency(selCurrency)}
                {Helper.switchAmount(selCurrency, item.prices)}
              </b>
              {Object.entries(attr).map(([key, value]) => 
                <div key={Math.random()}>
                  <h3 className="attr--title" style={{display: key === 'count' | key === 'id' && 'none'}}>{key}</h3>
                  <div className="attr--items">
                    {item.attributes.map(attr=> attr.name === key &&
                      attr.items.map((item, index) =>{ const includesHash = item.value.includes("#");
                        return (
                        <div key={index} className={`attr--item ${this.setActiveOrRoundBorder(item, value)}`} style={{ background: includesHash && item.value }}>{!includesHash && item.value}</div>
                        )}
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="item--right">
              <div className="item--buttons">
                <div to="/cart" className="item--button" onClick={()=>{this.handleAddQuantity(attr.id,item.prices)}}>+</div>
                <div className="item--quantity">
                  <b>{Object.entries(attr).map(([key, value]) => key === 'count' && value)}</b> 
                </div>
                <div className="item--button" onClick={()=>{this.handleSubtractQuantity(attr.id, item.prices)}}>-</div>
              </div>
              <div className="item--slider">
                <Slider sliderName={sliderName} slides={item.gallery} />
                {sliderName === 'cart-slider' && deleteButton}
              </div>
            </div>
          </li>})
        );
      })
    ) : (
      <p className="empty">The cart is empty</p>
    );
    return <>{addedItem}</>
  }
}

const mapStateToProps = (state)=>{
  const { selCurrency, cart, total } = state;
  return{ selCurrency, cart, total }
}
  
export default connect(mapStateToProps,{removeItem, addQuantity, subtractQuantity})(AddedItem)
