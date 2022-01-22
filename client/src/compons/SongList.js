import React, { Component } from 'react'
import { connect } from 'react-redux';
import { selectImage } from '../actions';


class SongList extends Component {
    renderList(){
        return this.props.images.map((image, index) => {
        return (
        <div className="item" key={index} style={{margin:'10px 20px 10px 0'}}>
            <div className="right floated content">
                <img src={image} alt="" style={{border:'1px solid #777', padding:'5px', cursor:'pointer',width:'15rem'}} className="ui button primary" onClick={()=>this.props.selectImage(image)} />
            </div>
            <div className="content">{index}b</div>
        </div>
        )
        })
    }
    render() {        
        return (
            <div className="ui divided list" style={{display:'flex'}}>
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = state => {    
    return { images: state.images } 
  }
  
export default connect(mapStateToProps,{selectImage})(SongList);
