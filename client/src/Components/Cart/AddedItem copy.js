import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import Slider from "./Slider";
import Attributes from "./Attributes";
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

  createAttributes = (product) => {
    return (
      <>
        {product.attributes.map((attribute, index) => {
          return <Attributes key={index}
            product={product}
            attribute={attribute} 
        />})}
      </>
    );
  };

  updateUI = () => {
    const { items, cart } = this.props;
    const values = Object.values(cart);
    const keys = Object.keys(cart);
    // console.log('items :>> ', items);
    console.log('keys :>> ', keys);
    console.log('values :>> ', values);
    // console.log('keys :>> ', keys);
    
    // values.map(val => val.items.map((item, i) => 
    //   <div key={i} style={{display: 'flex', justifyContent:'space-between', padding: '20px', margin: '10px 0', border: '1px solid #999'}}>
    //       <div>{Object.keys(item).map(key => <h2>{key}</h2>)}</div>
    //       <div>{Object.values(item).map(val => <h2>{val}</h2>)}</div>
    //   </div>
    // ))

    values.map(val => val.items.map((item, i) => {
      // console.clear();
      Object.keys(item).map(key => console.log('key', key))
      Object.values(item).map(val => console.log('val', val))
    }))
        
  }
  
  
  
  render() {
    this.updateUI();
    const {sliderName, addedItems, selCurrency, items, cart} = this.props;
    const attrValues = Object.values(cart);
    const keys = Object.keys(cart);
        
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
    const { addedItems, selCurrency, items, cart } = state;
    return{ addedItems, selCurrency, items, cart }
  }
  
export default connect(mapStateToProps,{removeItem, addQuantity, subtractQuantity})(AddedItem)
