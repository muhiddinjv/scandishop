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
    const x = prices[0].filter(price => price.currency === currency ? price.amount : 0 )
    return x[0].amount;
  }

  // static addActiveClass = (item, attribute) => {
  //   if (item.value.includes('#')) {if (attribute?.selected === item.value) return 'round-border'} 
  //   if (attribute?.selected === item.value) return 'active';  
  // }

  // static addActiveClass = (attributes) => {
  //   console.log('attributes :>> ', attributes);
  //   for (const attribute of attributes) {
  //     for (const item of attribute.items) {
  //       if (item.value.includes('#') && item.value === attribute.selected) return 'round-border';
  //       if (attribute.selected === item.value) return 'active';  
  //     }
  //   }
  //   // attributes.filter(attr => attr.selected === attribute.value && 'rounded-border')
  // }

  // static setBorderRadius = (attribute, index, item) => {
  //   if (attribute.value.includes("#")) { 
  //     return (<div key={index} className={`attr--item ${this.addActiveClass(attribute,item.attributes[0])}`}
  //         style={{ background: attribute.value }}
  //       />
  //     );
  //   } 
  // }  
}
