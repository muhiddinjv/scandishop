import React, { PureComponent } from 'react'
import Helper from "../../Helpers";
import "./ProductSlider.scss";

export default class ProductSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedImage: '' };
  }

  setBigImage = () => {
    const products = this.props.products[0];    
    if (products) return products.gallery[0]
  }

  selectImage = (image, images) => {
    const filteredImage = images[0].filter(selected => selected === image && image)
    this.setState({selectedImage: filteredImage[0]})
  }

  slider = () => { 
    const gallery = this.props.products.map(x=>x?.gallery);
  
    if (gallery[0]) {
      return <div className="slider">
        <ul className="slider__thumbnails">
          {gallery[0].map((img, ind) => 
            <li key={ind} onError={(e) => e.target.style.display='none'}>
              <img src={img} alt={ind} onClick={()=>this.selectImage(img, gallery)} onError={Helper.addDefaultSrc}/>
            </li>)}
        </ul>
        <div className="slider__slides">
          <img src={this.state.selectedImage === '' ? this.setBigImage() : this.state.selectedImage} onError={Helper.addDefaultSrc}  alt=""/>
        </div>
      </div>
    } else {
      return <div className="loader"></div>;
    }
  }
  render() {return (this.slider())}
}