import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../Redux/Actions';
import ProductSlider from "./ProductSlider";
import Attributes from "./Attributes";
import Helper from "../../Helpers/Helper";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import "./Product.scss";

class Product extends PureComponent {

  createAttributes = ({setFieldValue}) => {
    const p = this.props.products[0];
      return (
        <div className="product__attrs">
          {p.attributes.map((attribute, index) => {
            return <Attributes key={index}
            setFieldValue={setFieldValue}
            attribute={attribute} 
            id={p.id}
          />})}
        </div>
      );
  };

  handleAddToCart = (id, attrNames) => {
    this.props.addToCart(id, attrNames);
  };

  product() {
    const p = this.props.products[0]; 
    const attrNames = p?.attributes.map(attr => attr.name);
    // console.log('...p?.attributes :>> ', ...p?.attributes);
    // console.log('attrNames :>> ', attrNames);
    const { selCurrency } = this.props;


    if (p) {
      const initialValues = (p?.attributes || []).reduce(
        (acc, curr) => ({ ...acc, [curr.name]: "" }),
        {}
      );
      // initialValues = {Size: '', Colro: ''}
      const validationSchema = (p?.attributes || []).reduce(
        (acc, curr) => ({ ...acc, [curr.name]: yup.string().required() }),
        {}
      );

      //validation =  {Size: yup.string().requ(), Color: yup.string().req()}
      return  <Formik initialValues={{...initialValues}} 
      validateOnMount
      validationSchema={yup.object().shape({ ...validationSchema })}
      onSubmit={values=> {this.handleAddToCart(p.id, values)}}>
          {
            ({setFieldValue, isValid}) => {
              return <Form>
                 <div className="product__info">
                  <header className="product__header" key={"hi"}>
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
                  {/* <NavLink to="/cart"> */}
                    <button disabled={!isValid} className={`product__btn ${isValid && 'btn-hover'}`} type="submit">add to cart</button>
                  {/* </NavLink> */}
                  <div className="product__desc"
                    dangerouslySetInnerHTML={{ __html: p.description }}
                  />
                </div>
              </Form>
            }
          }
        </Formik>
       
      
    } else {
      return <div className="loader"></div>;
    }
  }

  render() {   
    const { images, products } = this.props;
    // console.clear();
    console.log('this.props.cart :>> ', this.props.cart);
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
