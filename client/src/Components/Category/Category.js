import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";

class Category extends PureComponent {
  onAddToCart = (id) => {
    this.props.addToCart(id);
  };

  render() {
    const { products, selCurrency } = this.props;

    
    
    return (
      <div className="category">
        <div className="category__header">
          <h1 className="category__name">{products.category}</h1>
        </div>
        <ul className="category__product">
          {products.map((product, i) => {
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
