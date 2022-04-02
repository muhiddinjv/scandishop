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

  // createAttributes = (product) => {
  //   return (
  //     <>
  //       {product.attributes.map((attribute, index) => {
  //         return <Attributes key={index}
  //           product={product}
  //           attribute={attribute} 
  //       />})}
  //     </>
  //   );
  // };

  createAttributes = (product, attr) => {
    console.log('attr :>> ', attr);
    console.log('product', product)
    // return (
    //   <>
    //     {product.attributes.map((attribute, index) => {
    //       return <Attributes key={index}
    //         product={product}
    //         attribute={attribute} 
    //     />})}
    //   </>
    // );
  };

  returnItems = (attributes, key, value) => {
    return attributes.map(attr=>{
      return attr.name === key &&
        attr.items.map(item => <div style={{color: item.value === value && 'red'}}>{item.value}</div>)
    })
  }

  updateUI = (cart) => {
    const products = Object.values(cart);

    const addedItem = products.length ? (
     products.map(items => 
      items.addedAttrs.map((attr, i) =>
       <div key={i} className="item" style={{border:'1px solid #999',padding: '10px 20px'}}>
          <h1>{items.brand}</h1>
          <h2>{items.name}</h2>
          <ul>
            {Object.entries(attr).map(([key, value]) =>
              <li style={{padding: '10px 0'}}>
                {/* <div className="item--header">
                  <h5 className="item--brand">{item.brand}</h5>
                  <h5 className="item--name">{item.name}</h5>
                </div> */}
                <h3 style={{display: key === 'count' && 'none'}}>{key}</h3>
                <h3 style={{display:'flex'}}>{this.returnItems(items.attributes, key, value)}</h3>
                <h3 style={{display: key !== 'count' && 'none'}}>{value}</h3>
              </li>
            )}
          </ul>
       </div>)
    )): (
      <p className="empty">The cart is empty</p>
    );
    return (
      <div>{addedItem}</div>
    )
  }  
  render() {
    const {sliderName, selCurrency, cart} = this.props;

    const products = Object.values(cart);
    console.log('products :>> ', products);
        
    const addedItem = products.length ? (
      products.map((item, index) => { 
        const deleteButton = <button className="item--delete" onClick={()=>{this.handleRemove(item.id)}}>X</button>
        return (
          item.addedAttrs.map(attr =>
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
              {this.createAttributes(item.attributes, attr)}
              {/* {this.updateUI(cart)} */}
            </div>

            <div className="item--right">
              <div className="item--buttons">
                <div to="/cart" className="item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</div>
                <div className="item--quantity">
                  <b>{item.totalCount}</b> 
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
