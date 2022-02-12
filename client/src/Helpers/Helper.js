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
    let x = prices[0].filter(price => price.currency === currency ? price.amount : 0 )
    return x[0].amount;
  }

  static addActiveClass(item, attribute){
    if (item.value.includes('#')) {if (attribute.selected === item.value) return '25%'} 
    if (attribute.selected === item.value) return 'active';  
  }
}
