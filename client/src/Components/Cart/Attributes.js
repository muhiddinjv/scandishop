import React, { Component } from "react";
import { connect } from "react-redux";
import { selectAttribute } from "../../Redux/Actions";

class Attributes extends Component {

    selectedAttribute = (item, attributeName, attributes) => {
      for (const attr of attributes) {
        if (attr.name === attributeName){
          if (item.value.includes("#")) { 
            if (item.value === attr.selected) return 'round-border'
          }
          if (item.value === attr.selected) return 'active'
        }
      }
    }
  
    render() {
      const { attributeName, attributeItems, attributes } = this.props;
      return (
        <div>
          <h3 className="product__attr--title">{attributeName}</h3>
          <div className="product__attr--items">
            {attributeItems?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index} style={{ background: item.value }}
                  className={`product__attr--item ${this.selectedAttribute(item, attributeName, attributes)}`}
                  />
                );
              } else {
                return (
                  <div key={index}
                    className={`product__attr--item ${this.selectedAttribute(item, attributeName, attributes)}`}
                    >
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

  const mapStateToProps = () => { return {} };

  export default connect(mapStateToProps, { selectAttribute })(Attributes);