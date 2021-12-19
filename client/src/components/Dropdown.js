import React, { Component } from "react";
import "../media/sass/Dropdown.scss";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
   this.state = {setSymbol: "$"}
  }

  symbols = (selectedOpt) => {
    let symbol;
    switch (selectedOpt) {
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
    this.setState({setSymbol: symbol});
  };

  setCurrency = () => {
    let currencies = this.props.state;
    if (currencies) {
      return currencies.map((currency) => (
        <option className="dropdown__option" key={currency}>
          {currency}
        </option>
      ));
    }
  };

  render() {
    return (
      <div className="dropdown">
        <label htmlFor="dropdown__select">{this.state.setSymbol}</label>
        <select
          id="dropdown__select"
          onChange={(e) => {
            this.symbols(e.target.value);
          }}
        >
          {this.setCurrency()}
        </select>
      </div>
    );
  }
}
