import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { selectAttribute } from "../../Redux/Actions";
import ProductSlider from "./ProductSlider";
import Attributes from "./Attributes";
import Helper from "../../Helpers/Helper";
import "./Product.scss";

class Product extends Component {
  state = { border: "" };

  toggleBorder = (item) => {
    this.setState(() => {
      return { border: item };
    });
  };

  roundBorder = (item, p) => {
    if (item.value.includes("#")) {
      return (
        <div
          key={item.value}
          className="product__attr--item color"
          style={{
            background: item.value,
            borderRadius: item === this.state.border && "25%",
          }}
          onClick={() => {
            this.toggleBorder(item);
            this.props.selectAttribute(p.id, item.value, p.attributes[0].name);
          }}
        />
      );
    }
  }

  createAttributes = () => {
    const { products, selectAttribute } = this.props;
    const p = products[0];
    console.log('product-comp: ',p.attributes);
    // air-pods & air-tags attributes = []
    // ps-5 & xbox: color > capacity
    // iphone 12: capacity > color
    // iMac: capacity > usb > touch

    if (p.attributes.length > 1) {
      return (
        <div className="product__attrs">
          <div className="product__attr1">
            <h3 className="product__attr--title">{p.attributes[0].name}</h3>
            <div className="product__attr--items">
              {p.attributes[0].items.map((item) => this.roundBorder(item, p))}
            </div>
          </div>
          <Attributes 
            selectAttr={selectAttribute}
            classNam={'product__attr2'} 
            name={p.attributes[1].name} 
            items={p.attributes[1].items} 
            id={p.id}
          />
        </div>
      );
    } else {
      return (
        <Attributes 
          selectAttr={selectAttribute}
          classNam={'product__attr1'} 
          name={p.attributes[0]?.name} 
          items={p.attributes[0]?.items}
          id={p.id}
        />
      );
    }
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
          {/* <textarea className="product__desc" id="description" cols="30" rows="10" defaultValue={p.description}/> */}
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
