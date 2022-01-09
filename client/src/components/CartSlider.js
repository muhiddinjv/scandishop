import React, { Component } from 'react';
import "../media/sass/CartSlider.scss";

// let slides = [
//   {
//     background: "https://www.w3schools.com/w3images/coffee.jpg",
//     text: "Coffee"
//   },
//   {
//     background: "https://www.w3schools.com/w3images/workbench.jpg",
//     text: "Workbench"
//   },
//   {
//     background: "https://www.w3schools.com/w3images/sound.jpg",
//     text: "Sound"
//   }
// ];
  

export default class SliderCart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeSlide: 0,
     };
  }
  
  prevSlide() {
    let slide = this.state.activeSlide - 1 < 0
      ? this.props.slides[0].length - 1
      : this.state.activeSlide - 1;
    this.setState({
      activeSlide: slide
    });
  }
  nextSlide() {
    let slide = this.state.activeSlide + 1 < this.props.slides[0].length
      ? this.state.activeSlide + 1
      : 0;
    this.setState({
      activeSlide: slide
    });
    this.props.slides.map((s,i)=>console.log(`index: ${i} ${this.state.activeSlide} :active`))
  }
  
  render() {    
    let slides = this.props.slides[0];
    
    return (
      <div className="slides">
        {slides.map((slide, index) => <div className="slider__slide" data-active={index === this.state.activeSlide} style={{ backgroundImage: `url( ${slide})` }}/>)}
        <div className="prev" onClick={this.prevSlide.bind(this)}>&#10094;</div>
        <div className="next" onClick={this.nextSlide.bind(this)}>&#10095;</div>
      </div>
    );
  }
}  