import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import Slider from "./Slider";
import { removeItem, addQuantity, subtractQuantity} from '../../Redux/Actions';

class AddedItem extends PureComponent {
  handleRemove = (id)=>{
    this.props.removeItem(id);
  }

  handleAddQuantity = (id)=>{
    this.props.addQuantity(id);
  }

  handleSubtractQuantity = (id)=>{
    this.props.subtractQuantity(id);
  }

  darkBgOrRoundBorder = (item, value) =>{
    const includesHash = item.value.includes("#");
    if (item.value === value && !includesHash) return 'active';
    if (item.value === value && includesHash) return 'round-border';
  }

  render() {
    const {sliderName, selCurrency, cart} = this.props;
    console.log('cart :>> ', cart);
    // const quantity = cart?.map(x=>x.totalCount).reduce((sum, a) => sum + a, 0);
    // console.log('quantity :>> ', quantity);

    const products = Object.values(cart);
        
    const addedItem = products.length ? (
      products.map(item => { 
        const deleteButton = <button className="item--delete" onClick={()=>{this.handleRemove(item.id)}}>X</button>
        return (
          item.addedAttrs.map((attr,i) => 
          <li className="item" key={i}>
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
                <div>
                  <h3 className="attr--title" style={{display: key === 'count' && 'none'}}>{key}</h3>
                  <div className="attr--items">
                    {item.attributes.map(attr=> attr.name === key &&
                      attr.items.map(item =>{ const includesHash = item.value.includes("#");
                        return (
                        <div className={`attr--item ${this.darkBgOrRoundBorder(item, value)}`} style={{ background: includesHash && item.value }}>{!includesHash && item.value}</div>
                        )}
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="item--right">
              <div className="item--buttons">
                <div to="/cart" className="item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</div>
                <div className="item--quantity">
                  <b>{Object.entries(attr).map(([key, value]) => key === 'count' && value)}</b> 
                </div>
                <div className="item--button" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</div>
              </div>
              <div className="item--slider">
                <Slider sliderName={sliderName} slides={item.gallery} />
                {sliderName === 'cart-slider' && deleteButton}
              </div>
            </div>
          </li>)
        );
      })
    ) : (
      <p className="empty">The cart is empty</p>
    );
    return (
      <div>{addedItem}</div>
    )
  }
}

const mapStateToProps = (state)=>{
    const { selCurrency, cart } = state;
    return{ selCurrency, cart }
  }
  
export default connect(mapStateToProps,{removeItem, addQuantity, subtractQuantity})(AddedItem)
