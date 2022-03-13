import React, { Component } from "react";
import { selectCurrency } from '../../Redux/Actions';
import { connect } from 'react-redux';
import Helper from '../../Helpers/Helper';
import "./Dropdown.scss";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.dropListSignRef = React.createRef();
    this.dropContentRef = React.createRef();
    this.dropLabelRef = React.createRef();
    this.dropBtnRef = React.createRef();
  }
  
  createDropdownList() {
    const {currencies} = this.props;

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
    const {selectCurrency, items} = this.props;
    this.dropBtnRef.current.classList.toggle("arrow-spin");    
    selectCurrency(currency, items[0].id)  
    this.dropLabelRef.current.innerText = Helper.switchCurrency(currency);
    this.dropContentRef.current.classList.toggle("show");
  }


  render() {
    return (
      <div className="dropdown">
        <label className="dropdown__label" htmlFor="dropdown" ref={this.dropLabelRef}>$</label>
        <button className="dropdown__btn" title="dropdown__btn" onClick={() => this.showCurrencies()} ref={this.dropBtnRef}></button>
        <ul className="dropdown__content" ref={this.dropContentRef}>
          {this.createDropdownList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {currencies, items} = state;
  return {currencies, items}
}

export default connect(mapStateToProps,{selectCurrency})(Dropdown);