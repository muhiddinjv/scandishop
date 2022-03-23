import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { selectAttribute } from "../../Redux/Actions";
import {withFormik} from 'formik'

class Attributes extends PureComponent {
    state = { active: ''};
  
    toggleClass = (item) => {   
      this.setState(() => {
        return { active: item };
      });
    };
  
    render() {
      const { id, attribute, selectAttribute, setFieldValue } = this.props;
      // console.log('this.props ', this.props)
      return (
        <div className="container">
          <label className="product__attr--title">{attribute.name}</label>
          <div className="product__attr--items">
            {(attribute?.items || [])?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index}
                  style={{ background: item.value }}
                  onClick={()=>{
                    this.toggleClass(item); 
                    setFieldValue(attribute.name, item.value)
                    // selectAttribute(id,item.value,attribute.name)
                  }}
                  className={`product__attr--item ${item === this.state.active && 'border'}`}
                  /> 
                );
              } else {
                return (
                  <div key={index}
                    className={`product__attr--item ${item === this.state.active && 'active'}`}
                    onClick={()=>{
                      this.toggleClass(item); 
                      setFieldValue(attribute.name, item.value)
                      // selectAttribute(id,item.value,attribute.name)
                    }}
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