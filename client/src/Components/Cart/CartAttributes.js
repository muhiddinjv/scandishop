import React, { Component } from "react";
import Helper from "../../Helpers/Helper";

export default class CartAttributes extends Component {
    render() {
      const { attributes, product } = this.props;

      return (
        <div>
          <div className="attr--items">
            {attributes?.map((attribute, index) => {
              if (attribute.value.includes("#")) { 
                return (
                  <div key={index} style={{ background: attribute.value }}
                  className={`attr--item ${Helper.addActiveClass(product.attributes)}`}
                  />
                );
              } else {
                return (
                  <div key={index} className={`attr--item ${Helper.addActiveClass(product.attributes)}`}>
                    {attribute.value}
                  </div>
                );
              }
            })}
          </div>
        </div>
      )
    }
  }