import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import "../media/sass/Dropdown.scss";

const Dropdown = () => {
  const { loading, error, data } = useQuery(gql`{currencies}`);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (data) {
      setItems(data.currencies);
    }
  }, [data]);

  if (loading) return "Loading....";
  if (error) return <pre>{error.message}</pre>;

  console.log(items);

  let itemsToRender;
  if (items) {
    itemsToRender = items.map((item) => {
      return (
        <option className="dropdown__option" key={item}>
          {item}
        </option>
      );
    });
  }

  return (
    <div>
      <label htmlFor="dropdown">$</label>
      <select id="dropdown" onChange={(e)=>{Symbols(e.target.value)}}>{itemsToRender}</select>
    </div>
  );
};


const Symbols = (currency) => {
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
      symbol = "not found"
  }
  console.log("symbol: "+symbol);

  return SetSymbol(symbol);
};

const SetSymbol = (symbol) => {
  console.log("set to: "+symbol);
  // return symbol;
}

export default Dropdown;
