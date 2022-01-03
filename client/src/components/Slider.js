import React, { Component } from 'react'
import "../media/sass/Slider.scss";

export default class Slider extends Component {
  slider() {
    let images = this.props.images[0];

    if (images) {
      return <div className="slider">
        <ul className="slider__thumbnails">
          {images.map((img, ind) => <li key={ind}><a href={`#slide${ind}`}><img src={img} alt={ind}/></a></li>)}
        </ul>
        <ul className="slider__slides">
          {images.map((img, ind) => <li key={ind} id={`slide${ind}`}><img src={img}  alt={ind}/></li>)}
        </ul>
      </div>
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {return (this.slider())}
}