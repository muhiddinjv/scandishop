import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Category from './components/Category'
import LOAD_QUERY from './graphql/Query';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: [],
      categories: "tech"//change to "tech"
    };
  }
  
  componentDidMount() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query: LOAD_QUERY, variables: {input: {title: this.state.categories}} 
      }),
    })
      .then((response) => response.json())
      .then(data=>{
        // console.log(data.data);
        this.setState({fetchedData: data.data})
      })
      .catch(error=>console.log(error));
  }
  
  render() {
    return (
      <div className='app'>
        <Navbar state={this.state.fetchedData.currencies}/>
        <Category category={this.state.fetchedData.category}/>
      </div>
    );
  }
}


