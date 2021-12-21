import React, { Component } from "react";
import "../media/sass/Dropdown.scss";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.dpdListSignRef = React.createRef();
    this.dpdContentRef = React.createRef();
    this.dpdLabelRef = React.createRef();
    this.dpdBtnRef = React.createRef();
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
        symbol = "not found";
    }    
    return symbol;
  };
  
  
  createDropdownList   = () => {
    let currencies = this.props.state;
    
    if (currencies) {
      return currencies.map((currency) => (
        <li className="dropdown__options" key={currency}>
          <span ref={this.dpdListSignRef}>{this.symbols(currency)}</span>
          <span onClick={() =>{this.changeCurrency(currency)}}>{currency}</span>
        </li>
      ));
    }
  };
  
  showCurrencies = (classlist) => {
    classlist.toggle("arrow-down");
    this.dpdContentRef.current.classList.toggle("show");
  }

  changeCurrency = (currency) => {
    this.dpdBtnRef.current.classList.toggle("arrow-down");
    this.dpdLabelRef.current.innerText = this.symbols(currency);
    this.dpdContentRef.current.classList.toggle("show");
  }

  render() {
    return (
      <div className="dropdown">
        <label className="dropdown__label" htmlFor="dropdown" ref={this.dpdLabelRef}>$</label>
        <button className="dropdown__btn" onClick={(e) =>this.showCurrencies(e.target.classList)} ref={this.dpdBtnRef}></button>
        <ul className="dropdown__content" ref={this.dpdContentRef}>
          {this.createDropdownList  ()}
        </ul>
      </div>
    );
  }
}
