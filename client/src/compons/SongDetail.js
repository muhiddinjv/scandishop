import React, { Component } from "react";
import { connect } from "react-redux";

class SongDetail extends Component {
  render() {
    const showSong = () => {
      const { image } = this.props;
      if (!image) {
        return <div>Select a song!</div>;
      } else {
        return ( <img src={image} alt={image} /> );
      }
    };
    return <div>{showSong()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { image: state.addedImage };
};

export default connect(mapStateToProps)(SongDetail);
