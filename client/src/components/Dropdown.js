import React, { Component } from "react";
import "../media/sass/Dropdown.scss";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.dropListSignRef = React.createRef();
    this.dropContentRef = React.createRef();
    this.dropLabelRef = React.createRef();
    this.dropBtnRef = React.createRef();
    // this.showCurrencies = this.showCurrencies.bind(this);
  }

  symbols = (currency) => {
    let symbol;
    switch (currency) {
      case "USD":
        symbol = "\u0024";
        break;
      case "GBP":
        symbol = "\u00A3";
        break;
      case "AUD":
        symbol = "\u20B3";
        break;
      case "JPY":
        symbol = "\u00A5";
        break;
      case "RUB":
        symbol = "\u20BD";
        break;
      default:
        symbol = "?";
    }    
    return symbol;
  };
  
  
  createDropdownList = () => {
    let currencies = this.props.state; //data received from server
    
    if (currencies) {
      return currencies.map((currency) => (
        <li className="dropdown__options" key={currency}>
          <span className="dropdown__options--symbol" ref={this.dropListSignRef}>{this.symbols(currency)}</span>
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
    this.dropLabelRef.current.innerText = this.symbols(currency);
    this.dropContentRef.current.classList.toggle("show");
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
