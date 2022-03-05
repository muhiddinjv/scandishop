import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";

class Category extends Component {
  onAddToCart = (id) => {
    this.props.addToCart(id);
  };

  // spaceEvenly = () => {
  //   const length = this.props.category.products?.length
  //   if (length) return length === 2 ? 'flex-start' :'space-evenly';
  // }

  render() {
    const { category, selCurrency } = this.props;
    const spaceEvenly = category.products?.length === 2 ? 'flex-start' :'space-evenly';

    return (
      <div className="category">
        <div className="category__header">
          <h1 className="category__name">{category.name}</h1>
        </div>
        <ul className="category__product" style={{justifyContent: spaceEvenly}}>
          {category.products?.map((product, i) => {
            return (
              <ProductCard
                key={i}
                product={product}
                selCurrency={selCurrency}
                onAddToCart={this.onAddToCart}
                selectProduct={this.props.selectProduct}
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
