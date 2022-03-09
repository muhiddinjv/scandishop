import React, { Component } from "react";
import { connect } from "react-redux";
import { selectAttribute } from "../../Redux/Actions";

class Attributes extends Component {
    state = { active: '' };
  
    toggleClass = (item) => {   
      this.setState(() => {
        return { active: item };
      });
    };
  
    render() {
      const { id, attributeName, attributes, selectAttribute } = this.props;
      return (
        <div>
          <h3 className="product__attr--title">{attributeName}</h3>
          <div className="product__attr--items">
            {attributes?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index} 
                  style={{ background: item.value }}
                  onClick={()=>{this.toggleClass(item); selectAttribute(id,item.value,attributeName)}}
                  className={`product__attr--item ${item === this.state.active && 'border'}`}
                  />
                );
              } else {
                return (
                  <div key={index}
                    className={`product__attr--item ${item === this.state.active && 'active'}`}
                    onClick={()=>{this.toggleClass(item); selectAttribute(id,item.value,attributeName)}}>
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