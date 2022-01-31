import React, { Component } from 'react'
import "../media/sass/Slider.scss";
import { connect } from 'react-redux';
import { selectImage } from '../actions';

class Slider extends Component {
  bigImage = () => {
    let gal = this.props.bigImage[0];
    if (gal) return gal.gallery[0]
  }

  slider = () => {
    let addedImage = this.props.addedImage;
    let images = this.props.images;   
  
    if (images) {
      return <div className="slider">
        <ul className="slider__thumbnails">
          {images.map((img, ind) => <li key={ind}><img src={img} alt={ind} onClick={()=>this.props.selectImage(img)}/></li>)}
        </ul>
        <div className="slider__slides">
          {<img src={addedImage.length < 1 ? this.bigImage() : addedImage}  alt=""/>}
        </div>
      </div>
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {return (this.slider())}
}

const mapStateToProps = state => {    
  const { images, addedImage } = state;
  return { images, addedImage } 
}

export default connect(mapStateToProps,{selectImage})(Slider);