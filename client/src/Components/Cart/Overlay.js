import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Helper from "../../Helpers";
import AddedItem from "./AddedItem";
import "./Overlay.scss";

class Overlay extends PureComponent {
  render() {     
    const {selCurrency, total, showOverlay, quantity } = this.props;
    
    return (      
      <div className="overlay">
        <div className="background" onClick={()=>showOverlay()}/>

        <div className="dropdown">
          <h5 className="page-name">my bag, {quantity} items</h5>
          <ul className="items"><AddedItem sliderName='overlay-slider'/></ul>

          <div style={{display: quantity === 0 ? 'none':'block'}}>
            <div className="total">
              <span>Total:</span>
              <span>{Helper.switchCurrency(selCurrency)}{total.toFixed(2)}</span>
            </div>
            <div className="btns" >
              <button className="btn" onClick={()=>alert('Viewed the bag!')}>view bag</button>
              <button className="btn" onClick={()=>alert('Checked out!')}>check out</button>
            </div>
          </div>
          
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { total, selCurrency } = state;
  return{ total, selCurrency }
}

export default connect(mapStateToProps)(Overlay)