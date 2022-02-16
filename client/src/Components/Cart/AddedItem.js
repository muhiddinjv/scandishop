import React, { Component } from 'react'
import { connect } from "react-redux";
import Helper from "../../Helpers/Helper";
import AddedAttribute from "./AddedAttribute";
import Slider from "./Slider";
import { removeItem, addQuantity,subtractQuantity} from '../../Redux/Actions';

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

  createAttributes(item) {        
    if (item.attributes.length > 1) { 
    return <div className="attrs">

      <div className="attr1">
        <div className="attr--items">
          {item.attributes[0].items.map((attribute, index) => 
            Helper.setBorderRadius(attribute, index, item)
          )}
        </div>
      </div>

      <div className="attr2">
        <div className="attr--items">
          <AddedAttribute added={item}/>
        </div>
      </div>
    </div>;
    } else {
      return <div className="attr1">
        <div className="attr--items">
          <AddedAttribute added={item}/>
        </div>
      </div>
    }
  }
  
  render() {
    let items = this.props.addedItems;
    let currency = this.props.selCurrency; 
    
    let addedItems = items.length ? (
      items.map((item) => {        
        const deleteButton = <button className="item--delete" onClick={()=>{this.handleRemove(item.id)}}>X</button>
        
        return (
          <li className="item" key={item.id}>
            <div className="item--left">
              <div className="item--header">
                <h5 className="item--brand">{item.brand}</h5>
                <h5 className="item--name">{item.name}</h5>
              </div>
              <b className="item--price">
                {Helper.switchCurrency(currency)}
                {Helper.switchAmount(currency, item.prices)}
              </b>
              {this.createAttributes(item)}
            </div>

            <div className="item--right">
              <div className="item--buttons">
                <div className="item--button" onClick={()=>{this.handleAddQuantity(item.id)}}>+</div>
                <div className="item--quantity">
                  <b>{item.quantity}</b>
                </div>
                <div className="item--button" onClick={()=>{this.handleSubtractQuantity(item.id)}}>-</div>
              </div>
              <div className="item--slider">
                <Slider sliderName={this.props.sliderName} slides={item.gallery} />
                {this.props.sliderName === 'cart-slider' && deleteButton}
              </div>
            </div>

          </li>
        );
      })
    ) : (
      <p className="empty">The cart is empty</p>
    );
    return (
      <>{addedItems}</>
    )
  }
}

const mapStateToProps = (state)=>{
    const { addedItems, selCurrency } = state;
    return{ addedItems, selCurrency }
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))},
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddedItem)
