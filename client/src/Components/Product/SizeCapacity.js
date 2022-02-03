import React, { Component } from "react";

export default class SizeCapacity extends Component {
    constructor(props) {
      super(props);
      this.state = { active: "" };
    }
  
    toggleClass = (item) => {   
      this.setState(() => {
        return { active: item };
      });
    };
  
    render() {
      return (
        <div className={this.props.class}>
          <h3 className="product__attr--title">{this.props.name}</h3>
          <div className="product__attr--items">
            {this.props.items.map((item, i) => {
              return (
                <div key={i} style={ item === this.state.active ? { background: "#333", color: "white" } : null}
                  className={`product__attr--item ${this.props.identifier}`}
                  onClick={(e)=>{ this.toggleClass(item); this.props.selectAttr(item.value, this.props.id, e)}}
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