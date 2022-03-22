import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { selectAttribute } from "../../Redux/Actions";

class Attributes extends PureComponent {
    state = { active: ''};
  
    toggleClass = (item) => {   
      this.setState(() => {
        return { active: item };
      });
    };
  
    render() {
      const { id, attributeName, attributes, selectAttribute } = this.props;
      // console.log('attributes :>> ', attributes);
      return (
        <div className="container">
          <label className="product__attr--title">{attributeName}</label>
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
                  // <div key={index}>
                  //   <input type="radio"name="radio"/>
                  //   <span onClick={()=>{this.toggleClass(item); selectAttribute(id,item.value,attributeName)}} className={`product__attr--item ${item === this.state.active && 'active'}`}>{item.value}</span>
                  //  </div>
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