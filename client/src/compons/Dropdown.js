import React, { Component } from "react";
import Helper from './Helper';
import "../media/sass/Dropdown.scss";
import { connect } from 'react-redux';
import { selectCurrency } from '../actions';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.dropListSignRef = React.createRef();
    this.dropContentRef = React.createRef();
    this.dropLabelRef = React.createRef();
    this.dropBtnRef = React.createRef();
  }
  
  createDropdownList() {
    let currencies = this.props.state; //data received from server
    if (currencies) {
      return currencies.map((currency) => (
        <li className="dropdown__options" key={currency}>
          <span className="dropdown__options--symbol" ref={this.dropListSignRef}>{Helper.switchCurrency(currency)}</span>
          <span className="dropdown__options--currency" onClick={() =>{this.changeCurrency(currency)}}>{currency}</span>
        </li>
      ));
    }
  };
  
  showCurrencies = () => {
    this.dropBtnRef.current.classList.toggle("arrow-spin");
    this.dropContentRef.current.classList.toggle("show");
  }

  changeCurrency = (currency) => {
    this.dropBtnRef.current.classList.toggle("arrow-spin");
    this.dropLabelRef.current.innerText = Helper.switchCurrency(currency);
    this.dropContentRef.current.classList.toggle("show");
    this.props.selectCurrency(currency)
  }

  render() {
    return (
      <div className="dropdown">
        <label className="dropdown__label" htmlFor="dropdown" ref={this.dropLabelRef}>$</label>
        <button className="dropdown__btn" onClick={() => this.showCurrencies()} ref={this.dropBtnRef}></button>
        <ul className="dropdown__content" ref={this.dropContentRef}>
          {this.createDropdownList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {    
  return { images: state.images } 
}

export default connect(mapStateToProps,{selectCurrency})(Dropdown);