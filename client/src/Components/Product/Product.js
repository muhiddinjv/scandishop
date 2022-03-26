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

  updateUI = () => {
    const { items, cart } = this.props;
    const values = Object.values(cart);
    
    return values.map(val => val.items.map((item, i) => 
      <div key={i} style={{padding: '20px', margin: '10px 0', border: '1px solid #999'}}>
          <h3>{Object.keys(item).map(key => key !== 'count' && ` - ${key}`)}</h3>
          <h1>{Object.values(item).map(val => ` - ${val}`)}</h1>
      </div>
    ))
        
  }

  product() {
    const p = this.props.products[0]; 
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

      //validation =  {Size: yup.string().req(), Color: yup.string().req()}
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
                  <div>{this.updateUI()}</div>
                </div>
              </Form>
            }
          }
        </Formik>
    } 
  }

  render() {   
    const { images, products } = this.props;
    return (
      <div className="product">
        <ProductSlider images={images} products={products}/>
        {this.product()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { images, selCurrency, cart, items } = state;
  return { images, selCurrency, cart, items };
};

export default connect(mapStateToProps, {addToCart})(Product);
