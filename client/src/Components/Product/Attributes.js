import React, { PureComponent } from "react";
export default class Attributes extends PureComponent {
  state = { active: ''};

  toggleClass = (item) => {   
    this.setState(() => {
      return { active: item };
    });
  };

  render() {
    const { attribute, setFieldValue } = this.props;
    return (
      <div className="product__attr">
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