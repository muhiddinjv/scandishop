import React, { Component } from "react";
import "../media/sass/Carousel.scss";

export default class Carousel extends Component {
  carousel() {
    let images = this.props.images[0];    
    if (images) {
      return images.map((img, ind) => {                  
        return (
            <div className="gallery product__carousel--img">
              <input type="radio" name="select" id={`img-tab-${ind}`} defaultChecked={ind === 0}/>
              <label htmlFor={`img-tab-${ind}`} style={{backgroundImage: `url(${img})`}} />
              <img src={img} key={ind} border="0"/>
            </div>
        );
      });
    } else {
      return <div className="loader"></div>;
    }
  }

  render() { return (this.carousel()) }
}
