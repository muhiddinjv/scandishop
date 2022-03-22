import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { selectAttribute } from "../../Redux/Actions";

class Attributes extends PureComponent {

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
      const { attribute, attributes } = this.props;
      return (
        <div>
          <h3 className="attr--title">{attribute.name}</h3>
          <div className="attr--items">
            {attribute.items?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index} id={index} style={{ background: item.value }}
                  className={`attr--item ${this.selectedAttribute(item, attribute.name, attributes)}`}
                  />
                );
              } else {
                return (
                  <div key={index} id={index}
                    className={`attr--item ${this.selectedAttribute(item, attribute.name, attributes)}`}
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