// import axios from 'axios';

export default class Helper {
  static switchCurrency = (currency) => {
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
  }

  static switchAmount = (currency, ...prices) => {
    console.log(prices);
    console.log(currency);
    const x = prices[0].filter(price => price.currency === currency ? price.amount : 0 )
    console.log(x);
    return x[0].amount;
  }

  static addActiveClass = (item, attribute) => {
    if (item.value.includes('#')) {if (attribute.selected === item.value) return '25%'} 
    if (attribute.selected === item.value) return 'active';  
  }

  static setBorderRadius = (attribute, index, item) => {
    if (attribute.value.includes("#")) { 
      return (<div key={index} className="attr--item"
          style={{ background: attribute.value, borderRadius: this.addActiveClass(attribute,item.attributes[0]) }}
        />
      );
    } 
  }  
}
