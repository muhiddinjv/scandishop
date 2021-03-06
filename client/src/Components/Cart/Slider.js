import React, { PureComponent } from 'react';
import defaultImage from '../../Assets/loading2.gif';
import "./OverlaySlider.scss";   
import "./CartSlider.scss";   

export default class Slider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      activeSlide: 0,
      loaded: false
     };
  }
  
  prevSlide() {
    const slide = this.state.activeSlide - 1 < 0
      ? this.props.slides.length - 1
      : this.state.activeSlide - 1;
    this.setState({
      activeSlide: slide
    });
  }
  nextSlide() {
    const slide = this.state.activeSlide + 1 < this.props.slides.length
      ? this.state.activeSlide + 1
      : 0;
    this.setState({
      activeSlide: slide
    });
  } 
  
  render() {    
    const { sliderName, slides } = this.props;
    
    return (
      <div className={sliderName}>
        {slides?.map((slide, index) => <div key={index} className={`${sliderName}--image`} data-active={index === this.state.activeSlide} style={{ backgroundImage: `url(${slide}), url(${defaultImage})` }} />)}
        <div className={`${sliderName}--prev`} onClick={this.prevSlide.bind(this)}>&#10094;</div>
        <div className={`${sliderName}--next`} onClick={this.nextSlide.bind(this)}>&#10095;</div>
      </div>
    );
  }
}  