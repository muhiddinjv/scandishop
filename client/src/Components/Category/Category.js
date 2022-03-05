import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";

class Category extends Component {
  onAddToCart = (id) => {
    this.props.addToCart(id);
  };

  render() {
    const { category, selCurrency } = this.props;

    return (
      <div className="category">
        <div className="category__header">
          <h1 className="category__name">{category.name}</h1>
        </div>
        <ul className="category__product">
          {category.products?.map((product, i) => {
            return (
              <ProductCard
                key={i}
                product={product}
                selCurrency={selCurrency}
                onAddToCart={this.onAddToCart}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selCurrency } = state;
  return { selCurrency };
};

export default connect(mapStateToProps)(Category);
