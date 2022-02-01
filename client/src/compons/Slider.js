import React, { Component } from 'react'
import "../media/sass/Slider.scss";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImage: '' };
  }

  bigImage = () => {
    let products = this.props.products[0];    
    if (products) return products.gallery[0]
  }

  selectImage = (image, images) => {
    let filtered = images[0].filter(selected => selected === image ? image : null)
    this.setState({selectedImage: filtered[0]})
  }

  slider = () => { 
    let gallery = this.props.products.map(x=>x.gallery);
  
    if (gallery[0]) {
      return <div className="slider">
        <ul className="slider__thumbnails">
          {gallery[0].map((img, ind) => 
            <li key={ind} >
              <img src={img} alt={ind} onClick={()=>this.selectImage(img, gallery)} onError={(event) => event.target.style.display = 'none'}/>
            </li>)}
        </ul>
        <div className="slider__slides">
          {<img src={this.state.selectedImage === '' ? this.bigImage() : this.state.selectedImage}  alt=""/>}
        </div>
      </div>
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {return (this.slider())}
}