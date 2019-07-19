import React, { Component } from 'react';

class SearchBar extends Component {
    render() {
      return(
        <div className="search-bar-wrap">
          <input onChange={(event)=> this.props.search(event)} placeholder="Search Books"/>
        </div>
      )
    }
  }

export default SearchBar;