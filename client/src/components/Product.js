import React, { Component } from "react";


export default class Product extends Component {
    
  carousel() {
    let images = this.props.category;
    // console.log(images);
    
    if (images) {
      return images.map((img) => {          
        return (
            <div className="product__carousel--img">
                {img.gallery.map((im, ind)=><img src={im} alt={img.name} key={ind}/>)}
            </div>
        );
      });
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {
    return (
      <div className="product">
        product page
        <div className="product__carousel">
          <div className="product__carousel--imgs">{this.carousel   ()}</div>
        </div>
      </div>
    );
  }
}
