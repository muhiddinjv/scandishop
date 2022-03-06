import React, { Component } from "react";

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
            {items.map((item, i) => {
              return (
                <div key={i} style={ item === this.state.active ? { background: "#333", color: "white" } : null}
                  className="product__attr--item"
                  onClick={(e)=>{ this.toggleClass(item); selectAttr(id,item.value,name)}}
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