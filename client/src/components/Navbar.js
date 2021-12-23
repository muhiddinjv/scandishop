import React, { Component } from 'react'
import { ReactComponent as Logo } from '../media/icons/logo.svg';
import { ReactComponent as EmptyCart } from '../media/icons/empty-cart.svg';
import Dropdown from './Dropdown';
import '../media/sass/Navbar.scss'

export default class Navbar extends Component {
    render() {
        return (
            <nav className='navbar'>
                <ul className='navbar__nav'>
                    <li className="navbar__nav-link">
                        <a href="/">women</a>
                    </li>
                    <li className="navbar__nav-link">
                        <a href="/">men</a>
                    </li>
                    <li className="navbar__nav-link">
                        <a href="/">kids</a>
                    </li>
                </ul>
                <div className='navbar__logo'>
                    <Logo />
                </div>
                <div className='navbar__actions'>
                    <Dropdown state={this.props.state}/>
                    <div className="navbar__actions-cart">
                        <EmptyCart />
                    </div>
                </div>
            </nav>
        )
    }
}