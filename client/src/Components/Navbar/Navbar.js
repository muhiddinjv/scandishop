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
                    <li className="navbar__nav--link" onClick={()=>this.props.changeCategory('')}>
                        <NavLink className="link" to="/">
                           all
                        </NavLink>
                    </li>
                    <li className="navbar__nav--link" onClick={()=>this.props.changeCategory('clothes')}>
                        <NavLink className="link" to="/">
                           clothes
                        </NavLink>
                    </li>
                    <li className="navbar__nav--link" onClick={()=>this.props.changeCategory('tech')}>
                        <NavLink className="link" to="/">
                           tech
                        </NavLink>
                    </li>
                </ul>
                <div className='navbar__logo'>
                    <a href="https://github.com/muhiddinjv/scandishop" title="github-muhiddinjv" target="__blank"><Logo /></a>
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