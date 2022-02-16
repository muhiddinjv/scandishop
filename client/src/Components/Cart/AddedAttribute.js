import React, { Component } from "react";
import Helper from "../../Helpers/Helper";

export default class AddedAttribute extends Component {
  render() {
    const { added } = this.props;
    const ind = added.attributes.length > 1 ? 1 : 0;

    return (
      <>
        {added.attributes[ind].items.map((attribute, index) => {
          if (attribute.value.includes("#")) {
            // eslint-disable-next-line no-lone-blocks
            return (<div key={index} className="attr--item" style={{background: attribute.value,}}/>);
          } else {
            return (<div key={index} className={`attr--item ${Helper.addActiveClass(attribute,added.attributes[ind])}`}>
                {attribute.value}</div>)
          }
        })}
      </>
    );
  }
}
