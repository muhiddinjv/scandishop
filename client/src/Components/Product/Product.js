import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { selectAttribute } from "../../Redux/Actions";
import ProductSlider from "./ProductSlider";
import Helper from "../../Helpers/Helper";
import "./Product.scss";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "", border: "" };
  }

  toggleClass = (item) => {   
    this.setState(() => {
      return { active: item };
    });
  };

  toggleBorder = (item) => {
    this.setState(() => {
      return { border: item };
    });
  };

  roundBorder = (item,i,p) => {
    if (item.value.includes("#")) {
      return (
        <div
          key={i}
          className="product__attr--item color"
          style={{
            background: item.value,
            borderRadius: item === this.state.border ? "25%" : null,
          }}
          onClick={(e) => {
            this.toggleBorder(item);
            this.props.selectAttribute(item.value, p.id, e);
          }}
        ></div>
      );
    }
  }

  attributes = () => {
    let p = this.props.products[0];

    if (p.attributes.length > 1) {
      return (
        <div className="product__attrs">
          <div className="product__attr1">
            <h3 className="product__attr--title">{p.attributes[0].name}</h3>
            <div className="product__attr--items">
              {p.attributes[0].items.map((item, i) => this.roundBorder(item, i, p))}
            </div>
          </div>
          <div className="product__attr2">
            <h3 className="product__attr--title">{p.attributes[1].name}</h3>
            <div className="product__attr--items">
              {p.attributes[1].items.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={
                      item === this.state.active
                        ? { background: "#333", color: "white" }
                        : null
                    }
                    className="product__attr--item capacity"
                    onClick={(e) => {
                      this.toggleClass(item);
                      this.props.selectAttribute(item.value, p.id, e);
                    }}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="product__attr1">
          <h3 className="product__attr--title">{p.attributes[0].name}</h3>
          <div className="product__attr--items">
            {p.attributes[0].items.map((item, i) => {
              return (
                <div
                  key={i}
                  style={
                    item === this.state.active
                      ? { background: "#333", color: "white" }
                      : null
                  }
                  className="product__attr--item size"
                  onClick={(e) => {
                    this.toggleClass(item);
                    this.props.selectAttribute(item.value, p.id, e);
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  product() {
    let p = this.props.products[0];    

    if (p) {
      return (
        <div className="product__info">
          <header className="product__header" key={"hi"}>
            <h1 className="product__brand">{p.brand}</h1>
            <h3 className="product__name">{p.name}</h3>
          </header>
          {this.attributes()}
          <div className="product__price">
            <h3 className="product__price--title">price</h3>
            <div className="product__price--amount">
              {Helper.switchCurrency(this.props.selectedCurrency)}
              {Helper.switchAmount(this.props.selectedCurrency, p.prices)}
            </div>
          </div>
          <NavLink
            to="/cart"
            className="product__btn"
            onClick={() => {
              this.handleClick(p.id);
            }}
          >
            add to cart
          </NavLink>
          <div
            className="product__desc"
            dangerouslySetInnerHTML={{ __html: p.description }}
          ></div>
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
  const { attr, images, selectedCurrency } = state;
  return { attr, images, selectedCurrency };
};

export default connect(mapStateToProps, { selectAttribute })(Product);
