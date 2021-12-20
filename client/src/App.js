import React, { Component } from 'react'
// import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
// import {onError} from '@apollo/client/link/error';
import Navbar from './components/Navbar'
import LOAD_DATA from './graphql/Categories';
import './media/sass/App.scss'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: LOAD_DATA }),
    })
      .then((response) => response.json())
      .then(data=>{
        // console.log(data.data.categories[0]);
        this.setState({fetchedData: data.data})
      })
      .catch(error=>console.log(error));
  }
  
  render() {
    return (
      <div className='app'>
        <Navbar state={this.state}/>
      </div>
    );
  }
}


