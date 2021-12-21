import React, { Component } from "react";
import "../media/sass/Dropdown.scss";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    // this.showList = this.showList.bind(this);
    this.state = {
      setSymbol: "$",
      getSymbols: ["\u0024","\u00A3","\u20B3","\u00A5","\u20BD"],
      // id: this.props.id
    }
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
    let symbols = this.state.getSymbols;
    
    if (currencies && symbols) {
      return currencies.map((currency) => (
        <li className="dropdown__options" key={currency}>
          <span></span>
          <span onClick={(e) =>{this.symbols(e.target.value)}}>{currency}</span>
        </li>
      ));
    }
  };
  
  showList = (classlist) => {
    classlist.toggle("arrow-down");
    // console.log(this.state.setClass);
    this.setState({setClass: "show"});
    this.dropdownRef.current.classList.toggle("show");
  }

  render() {
    return (
      <div className="dropdown">
        <label className="dropdown__label" htmlFor="dropdown">{this.state.setSymbol}</label>
        <button className="dropdown__btn" onClick={(e) =>this.showList(e.target.classList)}>Drop</button>
        <ul className="dropdown__content" ref={this.dropdownRef}>
          {this.setCurrency()}
        </ul>
      </div>
    );
  }
}
