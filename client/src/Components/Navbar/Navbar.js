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
            <label className="menu__btn" htmlFor="menu__toggle">
              <span></span>
            </label>
            <ul className="menu__box">
              <li
                className="menu__box--link"
                onClick={() => changeCategory("all")}
              >
                <NavLink className="menu__item" to="/">
                  all
                </NavLink>
              </li>
              <li
                className="menu__box--link"
                onClick={() => changeCategory("clothes")}
              >
                <NavLink className="menu__item" to="/">
                  clothes
                </NavLink>
              </li>
              <li
                className="menu__box--link"
                onClick={() => changeCategory("tech")}
              >
                <NavLink className="menu__item" to="/">
                  tech
                </NavLink>
              </li>
            </ul>
          </div>
          <div >
            <a
              href="https://github.com/muhiddinjv/scandishop"
              title="github-muhiddinjv"
              target="__blank"
            >
              <Logo className="navbar__logo" />
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
