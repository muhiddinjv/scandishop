import React, { Component } from "react";
// import Helper from "../../Helpers/Helper";

export default class Attributes extends Component {
    state = { active: '' };
  
    toggleClass = (item) => {   
      this.setState(() => {
        return { active: item };
      });
    };
  
    render() {
      const { classNam, id, name, items, selectAttribute } = this.props;
      return (
        <div className={classNam}>
          <h3 className="product__attr--title">{name}</h3>
          <div className="product__attr--items">
            {items?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index} 
                  style={{ background: item.value }}
                  onClick={()=>{this.toggleClass(item)}}
                  className={`product__attr--item ${item === this.state.active && 'border'}`}
                  />
                );
              } else {
                return (
                  <div key={index}
                    className={`product__attr--item ${item === this.state.active && 'active'}`}
                    onClick={()=>{this.toggleClass(item); selectAttribute(id,item.value,name)}}>
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