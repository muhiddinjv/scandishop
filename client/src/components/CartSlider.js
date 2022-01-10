import React, { Component } from 'react';
import "../media/sass/CartSlider.scss";   

export default class CartSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeSlide: 0,
     };
  }
  
  prevSlide() {
    let slide = this.state.activeSlide - 1 < 0
      ? this.props.slides.length - 1
      : this.state.activeSlide - 1;
    this.setState({
      activeSlide: slide
    });
  }
  nextSlide() {
    let slide = this.state.activeSlide + 1 < this.props.slides.length
      ? this.state.activeSlide + 1
      : 0;
    this.setState({
      activeSlide: slide
    });
  }
  
  render() {    
    let slides = this.props.slides;
    
    return (
      <div className="slides">
        {slides.map((slide, index) => <div className="slider__image" data-active={index === this.state.activeSlide} style={{ backgroundImage: `url( ${slide})` }}/>)}
        <div className="prev" onClick={this.prevSlide.bind(this)}>&#10094;</div>
        <div className="next" onClick={this.nextSlide.bind(this)}>&#10095;</div>
      </div>
    );
  }
}  