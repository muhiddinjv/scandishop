import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Overlay } from "../index";
import "./Navbar.scss";
import { ReactComponent as Logo } from "../../Assets/icons/logo.svg";
import { ReactComponent as EmptyCart } from "../../Assets/icons/empty-cart.svg";

export default class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.dropContentRef = React.createRef();
  }

  showOverlay = () => {
    this.dropContentRef.current.classList.toggle("show");
  };

  render() {
    const { changeCategory, quantity } = this.props;

    return (
      <div className="nav-wrapper">

        <nav className="navbar">
          <div className="menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" for="menu__toggle">
              <span></span>
            </label>
            <ul className="menu__box">
              <li onClick={() => changeCategory("all")}><NavLink className="menu__item" to="/">all</NavLink></li>
              <li onClick={() => changeCategory("clothes")}><NavLink className="menu__item" to="/">clothes</NavLink></li>
              <li onClick={() => changeCategory("tech")}><NavLink className="menu__item" to="/">tech</NavLink></li>
            </ul>
          </div>

          <ul className="navbar__nav">
            <li
              className="navbar__nav--link"
              onClick={() => changeCategory("all")}
            >
              <NavLink className="link" to="/">
                all
              </NavLink>
            </li>
            <li
              className="navbar__nav--link"
              onClick={() => changeCategory("clothes")}
            >
              <NavLink className="link" to="/">
                clothes
              </NavLink>
            </li>
            <li
              className="navbar__nav--link"
              onClick={() => changeCategory("tech")}
            >
              <NavLink className="link" to="/">
                tech
              </NavLink>
            </li>
          </ul>
          <div className="navbar__logo">
            <a
              href="https://github.com/muhiddinjv/scandishop"
              title="github-muhiddinjv"
              target="__blank"
            >
              <Logo />
            </a>
          </div>

          <div className="navbar__actions">
            <Dropdown />
            <div className="navbar__actions--cart">
              <NavLink className="link" to="/cart">
                <EmptyCart
                  onClick={() => this.showOverlay()}
                  className="navbar__actions--icon"
                />
              </NavLink>
              <span className="navbar__actions--qty">
                {quantity === 0 ? "" : quantity}
              </span>
            </div>
          </div>
          
        </nav>
        <div className="navbar__minicart">
            <div ref={this.dropContentRef} className="navbar__minicart--dropdown">
              <Overlay quantity={quantity} showOverlay={this.showOverlay} />
            </div>
        </div>
        
      </div>
    );
  }
}
