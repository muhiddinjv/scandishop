import React, { Component } from "react";
import "../media/sass/Carousel.scss";

export default class Carousel extends Component {
  render() {
    return (
      <div className="gallery">
        <input type="radio" name="select" id="img-tab-1" defaultChecked/>
        <label
          htmlFor="img-tab-1"
          style={{backgroundImage: "url(" + "https://images.unsplash.com/photo-1558981000-f294a6ed32b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjc5NjV9&auto=format&fit=crop&w=2550&q=80" + ")"}}
        ></label>
        <img
          src="https://images.unsplash.com/photo-1558981000-f294a6ed32b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjc5NjV9&auto=format&fit=crop&w=2550&q=80"
          border="0"
        />

        <input type="radio" name="select" id="img-tab-2" />
        <label  
          htmlFor="img-tab-2"
          style={{backgroundImage: "url(" + "https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" + ")"}}
        ></label>
        <img
          src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          border="0"
        />
      </div>
    );
  }
}
