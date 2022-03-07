import React, { Component } from "react";
// import Helper from "../../Helpers/Helper";

export default class Attributes extends Component {
    state = { active: "" };
  
    toggleClass = (item) => {   
      this.setState(() => {
        return { active: item };
      });
    };
  
    render() {
      const { classNam, id, name, items, selectAttr } = this.props;
      return (
        <div className={classNam}>
          <h3 className="product__attr--title">{name}</h3>
          <div className="product__attr--items">
            {items?.map((item, index) => {
              return (
                <div key={index}
                  className={`product__attr--item ${item === this.state.active && 'active'}`}
                  onClick={()=>{ this.toggleClass(item); selectAttr(id,item.value,name)}}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>
      )
    }
  }