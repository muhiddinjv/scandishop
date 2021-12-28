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
                    <li className="navbar__nav--link women" onClick={()=>this.props.filterProduct('clothes')}>
                        women
                    </li>
                    <li className="navbar__nav--link men" onClick={()=>this.props.filterProduct('clothes')}>
                        men
                    </li>
                    <li className="navbar__nav--link kids" onClick={()=>this.props.filterProduct('tech')}>
                        kids
                    </li>
                </ul>
                <div className='navbar__logo'>
                    <Logo />
                </div>
                <div className='navbar__actions'>
                    <Dropdown state={this.props.curr}/>
                    <div className="navbar__actions-cart">
                        <EmptyCart />
                    </div>
                </div>
            </nav>
        )
    }
}