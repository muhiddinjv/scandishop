import React, { Component } from 'react'
// import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
// import {onError} from '@apollo/client/link/error';
import Navbar from './components/Navbar'
import LOAD_DATA from './graphql/Categories';
import './App.scss'

// const errorLink = onError(({graphqlErrors, networkError})=>{
//   if ( graphqlErrors ) {
//     graphqlErrors.map(({message, location, path})=>{
//       return alert(`GraphQL Error ${message}`)
//     })
//   }
// })

// const link = from([
//   errorLink,
//   new HttpLink({uri: "http://localhost:4000/"})
// ])

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: link
// })


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
      // <ApolloProvider client={client}>
      <div className='app'>
        <Navbar state={this.state}/>
      </div>
    );
  }
}


