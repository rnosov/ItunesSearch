/**
 * Itunes search app 
 *
 * Copyright © Roman Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Navbar from './Navbar';
import List from './List';

const ENDPOINT = 'https://itunes.apple.com/search',
      ENTITY = ['musicArtist', 'album', 'musicTrack'],
      COUNTRY = 'GB',
      LIMIT = 10,
      URL = `${ENDPOINT}?country=${COUNTRY}&entity=${ENTITY.join()}&limit=${LIMIT}`;

class App extends Component {

  searchField = { value: 'U2' };
  noFetching = true;
  state = {    
    offset: 0,
    list: [], 
    toggles: {},
    msg: 'Use the box in the top left corner to search iTunes',
  };

  fetch( forceFetch = false ) {    
    if (this.noFetching && !forceFetch) return;
    this.noFetching = true;
    this.setState({ msg: 'Loading, please wait ...' }); 
    const req = `${URL}&term=${this.state.terms}&offset=${this.state.offset}`;
    fetchJsonp(req)
    .then( response => response.json().then( data => this.setState({
      list: [...this.state.list, ...data.results],  
      offset: this.state.offset + data.resultCount,       
      msg: data.resultCount<LIMIT?`
        There are no${this.state.list.length||data.resultCount?' more ':' '}results
        `:'',
    }, () => { this.noFetching = data.resultCount<LIMIT } )))
    .catch( err => this.setState({ msg: `Houston, we have a problem. ${err}` }));
  }   

  handleSubmit = () => this.setState({ 
    list: [], 
    toggles: {}, 
    offset: 0,    
    terms: encodeURIComponent(this.searchField.value)
  }, () => this.fetch(true) ); 
  
  handleToggle = (index) => {
    return () => 
      this.setState({ toggles: { ...this.state.toggles, [index]: !this.state.toggles[index] } });
  };

  handleScroll = ev => {
    if (window.pageYOffset > document.body.clientHeight - window.innerHeight) 
      this.fetch();
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }  

  render() {    
    return (
      <div>
        <Navbar 
          onSubmit={this.handleSubmit} 
          query={this.searchField.value}
          saveRef={ ref => {this.searchField = ref} }
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <h3>Favourites</h3>          
               <List 
                data={this.state.list} 
                toggles={this.state.toggles} 
              />          
            </div>
            <div className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 main">    
              <div className="row">
                <List 
                  data={this.state.list} 
                  toggles={this.state.toggles} 
                  onToggle={this.handleToggle} 
                />          
              </div>
              { !this.state.list.length?void 0:
                <div className="row">
                  <button onClick={ () => this.fetch() } type="button" className="btn btn-secondary">Load More</button>
                </div>              
              }
              <div className="row">{this.state.msg} {this.state.err}</div>
            </div>
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
