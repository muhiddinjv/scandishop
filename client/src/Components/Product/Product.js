import React, { PureComponent } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { addToCart } from '../../Redux/Actions';
import ProductSlider from "./ProductSlider";
import Attributes from "./Attributes";
import Helper from "../../Helpers";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import "./Product.scss";

class Product extends PureComponent {  
  state = {navigate: false};

  createAttributes = ({setFieldValue}) => {
    const p = this.props.products[0];
      return (
        <div className="product__attrs">
          {p.attributes.map((attribute, i) => 
            <Attributes key={i} setFieldValue={setFieldValue} attribute={attribute}/>)}
        </div>
      );
  };

  handleAddToCart = (product, attrValues) => {
    this.props.addToCart(product, attrValues);
    this.setState({navigate: true})
  };  

  product() {
    const p = this.props.products[0]; 
    const { selCurrency } = this.props;

    if (p) {
      const initialValues = (p?.attributes || []).reduce(
        (acc, curr) => ({ ...acc, [curr.name]: "" }),
        {}
      );
      // initialValues = {Size: '', Color: ''}
      const validationSchema = (p?.attributes || []).reduce(
        (acc, curr) => ({ ...acc, [curr.name]: yup.string().required() }),
        {}
      );

      //validation =  {Size: yup.string().req(), Color: yup.string().req()}
      return  <Formik initialValues={{...initialValues}} 
      validateOnMount
      validationSchema={yup.object().shape({ ...validationSchema })}
      onSubmit={values=> {this.handleAddToCart(p, values)}}>
          {  
            ({setFieldValue, isValid}) => {
              return <Form>
                <div className="product__info">
                  <header className="product__header">
                    <h1 className="product__brand">{p.brand}</h1>
                    <h3 className="product__name">{p.name}</h3>
                  </header>
                  {this.createAttributes({setFieldValue})}
                  <div className="product__price">
                    <h3 className="product__price--title">price</h3>
                    <div className="product__price--amount">
                      {Helper.switchCurrency(selCurrency)}
                      {Helper.switchAmount(selCurrency, p.prices)}
                    </div>
                  </div>
                  {/* <div style={{width: 40, background: 'red'}} onClick={() => setFieldValue('Size', '40')}>size: 40</div> */}
                    <button type="submit" className={`product__btn ${isValid && 'btn-hover'}`} disabled={!isValid}>
                        add to cart
                    </button>
                  <div className="product__desc"
                    dangerouslySetInnerHTML={{ __html: p.description }}
                  />
                </div>
              </Form>
            }
          }
        </Formik>
    } 
  }

  render() {   
    const { images, products } = this.props;
    if (this.state.navigate) {return <Navigate to="/cart"/>};
    
    return (
      <div className="product">
        <ProductSlider images={images} products={products}/>
        {this.product()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { images, selCurrency, cart } = state;
  return { images, selCurrency, cart };
};

export default connect(mapStateToProps, {addToCart})(Product);
