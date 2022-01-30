import React, { Component } from 'react';
import { ReactComponent as Logo } from '../media/icons/logo.svg';
import { ReactComponent as EmptyCart } from '../media/icons/empty-cart.svg';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import CartMini from "./CartMini";
import '../media/sass/Navbar.scss';

export default class Navbar extends Component {
    constructor(props) {
    super(props);
    this.dropContentRef = React.createRef();
    }

    showMiniCart = () => {
        this.dropContentRef.current.classList.toggle("show");
    }

    render() {
        let quantity = this.props.qty.reduce((sum, a) => sum + a, 0);
        
        return (
            <div>
                <nav className='navbar'>
                <ul className='navbar__nav'>
                    <li className="navbar__nav--link" onClick={()=>this.props.filterProduct('jacket-canada-goosee')}>
                        <NavLink className="link" to="/">
                           women
                        </NavLink>
                    </li>
                    <li className="navbar__nav--link" onClick={()=>this.props.filterProduct('huarache-x-stussy-le')}>
                        <NavLink className="link" to="/">
                           men
                        </NavLink>
                    </li>
                    <li className="navbar__nav--link" onClick={()=>this.props.filterProduct('ps-5')}>
                        <NavLink className="link" to="/">
                           kids
                        </NavLink>
                    </li>
                </ul>
                <div className='navbar__logo'>
                    <NavLink to="/"><Logo /></NavLink>
                </div>
                <div className='navbar__actions'>
                    <Dropdown state={this.props.curr} products={this.props.products}/>
                    <div className="navbar__actions--cart">
                        <EmptyCart onClick={() => this.showMiniCart()} className="navbar__actions--icon"/>
                        <span className="navbar__actions--qty">{quantity === 0 ? "" : quantity}</span>
                    </div>
                    
                </div>
            </nav>
            <div className="navbar__minicart">
                <div ref={this.dropContentRef} className='navbar__minicart--dropdown'>
                  <CartMini qty={quantity} showMiniCart={this.showMiniCart}/>
                </div>
            </div>
            </div>
        )
    }
}