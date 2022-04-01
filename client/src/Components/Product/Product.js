import React, { PureComponent } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { addToCart } from '../../Redux/Actions';
import ProductSlider from "./ProductSlider";
import Attributes from "./Attributes";
import Helper from "../../Helpers/Helper";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import "./Product.scss";

class Product extends PureComponent {  
  state = {navigate: false};

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
    this.setState({navigate: true})
  };
  

  updateUI = () => {
    const { items, cart } = this.props;
    // const values = Object.values(cart);
    // const keys = Object.keys(cart);
    // const addedProducts = items.filter(item => keys.find(key => key===item.id)).map(prod => prod.attributes);
    // console.clear();
    // console.table('addedProducts :>> ', addedProducts);
    // console.table('values :>> ', values);

    // for (const [key, value] of Object.entries(cart)) {
    //   console.log(key + ":" + value)
    // }

    Object.entries(cart).forEach(([key, value]) => {
      console.log('key', key)
      console.log('value', value)
    })

    // items.map(item => console.log('cart[item.id]', cart[item.id]?.items))

    
    // return values.map(val => val.items.map((item, i) => 
    //   <div key={i} style={{display: 'flex', justifyContent:'space-between', padding: '20px', margin: '10px 0', border: '1px solid #999'}}>

    //       <div>{Object.keys(item).map(key => <h2>{key}</h2>)}</div>
    //       <div>{Object.values(item).map(val => <h2>{val}</h2>)}</div>
    //       <div>{Object.entries(item).map((key, value)=> {
    //         console.log('key', key)
    //         console.log('value :>> ', value);
    //       })}</div>          
    //   </div>
    // ))
        
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
                    <button type="submit" className={`product__btn ${isValid && 'btn-hover'}`} disabled={!isValid}>
                        add to cart
                    </button>
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
    // if (this.state.navigate) {return <Navigate to="/cart" />};
    
    
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
