import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { selectAttribute } from "../../Redux/Actions";
import ProductSlider from "./ProductSlider";
import Attributes from "./Attributes";
import Helper from "../../Helpers/Helper";
import "./Product.scss";

class Product extends Component {

  createAttributes = () => {
    const { products, selectAttribute } = this.props;
    const p = products[0];
    // console.clear();
    console.log('attrs: ',p.attributes);
    console.log('?. ',p?.attributes[2]);
    // air-pods & air-tags attributes = []
    // Nike & shirt: size = capacity = usb = touch
    // ps-5 & xbox: color > capacity
    // iphone 12: capacity > color
    // iMac: capacity > usb > touch
    // 1) size,capacity,usb,touch: black
    // 2) color: rounded corner

      return (
        <div className="product__attrs">
          <Attributes
            selectAttribute={selectAttribute}
            classNam={'product__attr1'} 
            name={p.attributes[0]?.name} 
            items={p.attributes[0]?.items}
            id={p.id}
          />
          <Attributes 
            selectAttribute={selectAttribute}
            classNam={'product__attr2'} 
            name={p.attributes[1]?.name} 
            items={p.attributes[1]?.items} 
            id={p.id}
          />
          <Attributes 
            selectAttribute={selectAttribute}
            classNam={'product__attr2'} 
            name={p.attributes[2]?.name} 
            items={p.attributes[2]?.items} 
            id={p.id}
          />
        </div>
      );
  };

  handleAddToCart = (id) => {
    this.props.addToCart(id);
  };

  product() {
    const p = this.props.products[0]; 

    if (p) {
      return (
        <div className="product__info">
          <header className="product__header" key={"hi"}>
            <h1 className="product__brand">{p.brand}</h1>
            <h3 className="product__name">{p.name}</h3>
          </header>
          {this.createAttributes()}
          <div className="product__price">
            <h3 className="product__price--title">price</h3>
            <div className="product__price--amount">
              {Helper.switchCurrency(this.props.selCurrency)}
              {Helper.switchAmount(this.props.selCurrency, p.prices)}
            </div>
          </div>
          <NavLink
            to="/cart"
            className="product__btn"
            onClick={() => {
              this.handleAddToCart(p.id);
            }}
          >
            add to cart
          </NavLink>
          <div className="product__desc"
            dangerouslySetInnerHTML={{ __html: p.description }}
          />
        </div>
      );
    } else {
      return <div className="loader"></div>;
    }
  }

  render() {   
    return (
      <div className="product">
        <ProductSlider images={this.props.images} products={this.props.products}/>
        {this.product()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { images, selCurrency } = state;
  return { images, selCurrency };
};

export default connect(mapStateToProps, { selectAttribute })(Product);
