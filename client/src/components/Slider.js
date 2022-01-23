import React, { Component } from 'react'
import "../media/sass/Slider.scss";
import { connect } from 'react-redux';
import { selectImage } from '../actions';

class Slider extends Component {
  slider() {
    let images = this.props.images;

    if (images) {
      return <div className="slider">
        <ul className="slider__thumbnails">
          {images.map((img, ind) => <li key={ind}><img src={img} alt={ind} onClick={()=>this.props.selectImage(img)}/></li>)}
        </ul>
        <div className="slider__slides">
          {<img src={this.props.image}  alt=""/>}
        </div>
      </div>
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {return (this.slider())}
}

const mapStateToProps = state => {    
  return { images: state.images, image: state.addedImage } 
}

export default connect(mapStateToProps,{selectImage})(Slider);