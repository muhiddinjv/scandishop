import React, { Component } from "react";

export default class Parent extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState({
      someVar: "some value",
    });
  }

  render() {
    return <Child handler={this.handler} />;
  }
}

  class Child extends Component {
    // render() {
    //   return <Button onClick = {this.props.handler}/ >
    // }
  }
