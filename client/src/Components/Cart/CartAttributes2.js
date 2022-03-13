import React, { Component } from 'react'
import Helper from "../../Helpers/Helper";

export default class CartAttributes extends Component {
  // handleAttribute = (items, index) => {
  //   // const ind = added.attributes.length > 1 ? 1 : 0;
  //   return (
  //     <>
  //       {items.map((attribute, index) => {
  //         if (attribute.value.includes("#")) {
  //           return (<div key={index} className="attr--item" style={{background: attribute.value}}/>);
  //         } else {
  //           return (<div key={index} className={`attr--item ${Helper.addActiveClass(attribute,added.attributes[ind])}`}>{attribute.value}</div>)
  //         }
  //       })}
  //     </>
  //   );
  // }

  render() {
    const { attributes, product } = this.props;
    return (
      <div>
        {attributes.map((attribute, index) => {
          if (attribute.value.includes("#")) {
            return (<div key={index} className="attr--item" style={{background: attribute.value}}/>);
          } else {
            return (<div key={index} className={`attr--item ${Helper.addActiveClass(attribute, product.attributes[index])}`}>{attribute.value}</div>)
          }
        })}
      </div>
    )
  }
}
