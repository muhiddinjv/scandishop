import React, { Component } from "react";
import Helper from "../../Helpers/Helper";

export default class CartAttributes extends Component {
    render() {
      const { attributes, product } = this.props;
      
      return (
        <div>
          <div className="attr--items">
            {attributes?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index} style={{ background: item.value }}
                  className={`attr--item ${Helper.addActiveClass(item, product.attributes[index])}`}
                  />
                );
              } else {
                return (
                  <div key={index} className={`attr--item ${Helper.addActiveClass(item, product.attributes[index])}`}>
                    {item.value}
                  </div>
                );
              }
            })}
          </div>
        </div>
      )
    }
  }