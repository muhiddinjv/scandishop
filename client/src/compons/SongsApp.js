import React, { Component } from 'react';
import SongList from './SongList';
import SongDetail from './SongDetail';

export default class SongsApp extends Component {
  render() {
    return (
      <div className="ui container grid" style={{fontSize:'1.6rem'}}>
        <div className="ui row">
          <div className="column eight wide">
            <SongList />
          </div>
          <div className="column eight wide">
            <SongDetail/>
          </div>
        </div>
      </div>
    )
  }
}
