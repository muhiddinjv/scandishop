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
    this.myRef = React.createRef(); // stale closure solution
  }
  
  createDropdownList() {
    let currencies = this.props.state; //data received from server
    if (currencies) {
      return currencies.map((currency) => (
        <li className="dropdown__options" key={currency}>
          <span className="dropdown__options--symbol" ref={this.dropListSignRef}>{Helper.switchCurrency(currency)}</span>
          <span className="dropdown__options--currency" onClick={() =>{this.changeCurrency(currency)}} ref={this.myRef}>{currency}</span>
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
    // let x = this.myRef.current = currency;
    this.props.selectCurrency(currency, this.props.products[0].id)  
    
    // setTimeout(() => {
      //   this.dropLabelRef.current.innerText = this.props.currSymbol;
    // }, 0);
    this.dropLabelRef.current.innerText = Helper.switchCurrency(currency);
    this.dropContentRef.current.classList.toggle("show");
    // console.log('dropdown input: ',currency);    
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
  return { currSymbol: state.currSymbol } 
}

export default connect(mapStateToProps,{selectCurrency})(Dropdown);