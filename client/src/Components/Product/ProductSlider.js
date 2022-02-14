import React, { Component } from 'react'
import "./ProductSlider.scss";

export default class ProductSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedImage: '' };
  }

  setBigImage = () => {
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
            <li key={ind} onError={(e) => e.target.style.display='none'}>
              <img src={img} alt={ind} onClick={()=>this.selectImage(img, gallery)}/>
            </li>)}
        </ul>
        <div className="slider__slides">
          {<img src={this.state.selectedImage === '' ? this.setBigImage() : this.state.selectedImage}  alt=""/>}
        </div>
      </div>
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {return (this.slider())}
}