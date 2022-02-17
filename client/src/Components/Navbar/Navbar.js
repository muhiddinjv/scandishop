import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Overlay } from '../index'
import './Navbar.scss';
import { ReactComponent as Logo } from '../../Assets/icons/logo.svg';
import { ReactComponent as EmptyCart } from '../../Assets/icons/empty-cart.svg';

export default class Navbar extends Component {
    constructor(props) {
    super(props);
    this.dropContentRef = React.createRef();
    }

    showOverlay = () => {
        this.dropContentRef.current.classList.toggle("show");
    }

    render() {
        const quantity = this.props.qty;
        
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
                    <NavLink to="/" title="navbar-logo"><Logo /></NavLink>
                </div>
                <div className='navbar__actions'>
                    <Dropdown state={this.props.curr} products={this.props.products}/>
                    <div className="navbar__actions--cart">
                        <EmptyCart onClick={() => this.showOverlay()} className="navbar__actions--icon"/>
                        <span className="navbar__actions--qty">{quantity === 0 ? "" : quantity}</span>
                    </div>
                    
                </div>
            </nav>
            <div className="navbar__minicart">
                <div ref={this.dropContentRef} className='navbar__minicart--dropdown'>
                  <Overlay qty={quantity} showOverlay={this.showOverlay}/>
                </div>
            </div>
            </div>
        )
    }
}