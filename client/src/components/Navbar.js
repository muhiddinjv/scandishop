import React, { Component } from 'react';
import { ReactComponent as Logo } from '../media/icons/logo.svg';
import { ReactComponent as EmptyCart } from '../media/icons/empty-cart.svg';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';
import '../media/sass/Navbar.scss';

export default class Navbar extends Component {
    
    render() {
        return (
            <nav className='navbar'>
                <ul className='navbar__nav'>
                    <li className="navbar__nav--link" onClick={()=>this.props.filterProduct('jacket-canada-goosee')}>
                        women
                    </li>
                    <li className="navbar__nav--link" onClick={()=>this.props.filterProduct('huarache-x-stussy-le')}>
                        men
                    </li>
                    <li className="navbar__nav--link" onClick={()=>this.props.filterProduct('ps-5')}>
                        kids
                    </li>
                </ul>
                <div className='navbar__logo'>
                    <NavLink to="/"><Logo /></NavLink>
                </div>
                <div className='navbar__actions'>
                    <Dropdown state={this.props.curr}/>
                    <div className="navbar__actions--cart">
                        <EmptyCart />
                    </div>
                </div>
            </nav>
        )
    }
}