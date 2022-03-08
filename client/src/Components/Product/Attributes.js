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
      const { classNam, id, name, items, selectAttribute } = this.props;
      return (
        <div >
          <h3 className={`${classNam}--title`}>{name}</h3>
          <div className={`${classNam}--items`}>
            {items?.map((item, index) => {
              if (item.value.includes("#")) { 
                return (
                  <div key={index} 
                  style={{ background: item.value }}
                  onClick={()=>{this.toggleClass(item)}}
                  className={`${classNam}--item ${item === this.state.active && 'border'}`}
                  />
                );
              } else {
                return (
                  <div key={index}
                    className={`${classNam}--item ${item === this.state.active && 'active'}`}
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

  const mapStateToProps = () => { return {} };

  export default connect(mapStateToProps, { selectAttribute })(Attributes);