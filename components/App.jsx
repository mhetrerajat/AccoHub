import React, { Component } from 'react';
import 'isomorphic-fetch';
import update from 'react-addons-update';
import __ from 'underscore';

import SortByPanel from './SortByPanel.jsx';
import LikesPanel from './LikesPanel.jsx';
import Search from './Search.jsx';

class App extends Component{
  constructor(){
    super()
    this.state= {
      menu : [],
      isFetched : false,
      searchText : '',
      sortType : '',
      likes : {}
    }
  }




  // fetch data from api
  fetchProductList(){
    fetch('https://hackerearth.0x10.info/api/accolite_product?type=json&query=list_product')
    .then((response)=>  response.json())
    .then((responseData) => {this.setState({menu : responseData.menu})})
    .then(this.setState({ isFetched : !this.state.isFetched }))
    .catch((error) => console.error('Error fetching', error))
  }


  // update state after initial rendering of page
  componentDidMount(){
    this.fetchProductList()
    //this.setState({tags :  __.uniq(__.flatten(this.state.menu.map((mapItem) => mapItem.tags.map((item) => item.trim()))))})
    //__.pluck(this.state.menu, "name").map((item) => initLikeList(item))
  }

  //update app state with search term
  handleSearchInput(searchTerm){
    this.setState({searchText : searchTerm})
  }

  // update state type of sorting applied on data
  handleSortFilter(sortType){
    this.setState({sortType : sortType})
  }

  // update like counts
  handleLikeToggle(name, count, type){
    switch (type) {
      case 1:
        count = count + 1
          let incrementLike = update(this.state.likes, {
              $merge : {
                [name] : [count]
              }
          })
        this.setState({ likes : incrementLike})
        break;
      case 0:
        count = count - 1
          let decrementLike = update(this.state.likes, {
              $merge : {
                [name] : [count]
              }
          })
        this.setState({ likes : decrementLike})
    }
  }


  render(){
    return(
      <div className="primary">
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">AccoHub — a simplified way to search accolite products!</a>
                </div>
            </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <SortByPanel handleSortFilterCallback={this.handleSortFilter.bind(this)}/>
              <LikesPanel likes={this.state.likes}/>
            </div>
            <div className="col-sm-9">
              <Search menu={this.state.menu}
              isFetched={this.state.isFetched}
              searchInputCallback={this.handleSearchInput.bind(this)}
              searchText={this.state.searchText}
              sortType={this.state.sortType}
              handleLikeToggleCallback={this.handleLikeToggle.bind(this)}
              likes={this.state.likes}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
