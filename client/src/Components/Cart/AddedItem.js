import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import Slider from "./Slider";
import { removeItem, addQuantity, subtractQuantity} from '../../Redux/Actions';

class AddedItem extends PureComponent {
  handleRemove = (id)=>{
    this.props.removeItem(id);
  }

  handleAddQuantity = (attr, selProducts, addedAttr)=>{
    this.props.addQuantity(attr, selProducts, addedAttr);
  }

  handleSubtractQuantity = (attr, selProducts)=>{
    this.props.subtractQuantity(attr, selProducts);
  }

  darkBgOrRoundBorder = (item, value) =>{
    const includesHash = item.value.includes("#");
    if (item.value === value && !includesHash) return 'active';
    if (item.value === value && includesHash) return 'round-border';
  }

  myFunc = e => {
    console.log('e.timeStamp :>> ', e.timeStamp);
  }

  render() {
    const {sliderName, selCurrency, cart, selProducts} = this.props;
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
                <div key={Math.random()}>
                  <h3 className="attr--title" style={{display: key === 'count' | key === 'id' && 'none'}}>{key}</h3>
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

            <div className="item--right" >
              <div className="item--buttons">
                <div to="/cart" className="item--button" onClick={(e)=>{this.handleAddQuantity(attr, selProducts, e)}}>+</div>
                <div className="item--quantity">
                  <b>{Object.entries(attr).map(([key, value]) => key === 'count' && value)}</b> 
                </div>
                <div className="item--button" onClick={()=>{this.handleSubtractQuantity(attr, selProducts)}}>-</div>
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
    return <>{addedItem}</>
  }
}

const mapStateToProps = (state)=>{
    const { selCurrency, cart, total } = state;
    return{ selCurrency, cart, total }
  }
  
export default connect(mapStateToProps,{removeItem, addQuantity, subtractQuantity})(AddedItem)
