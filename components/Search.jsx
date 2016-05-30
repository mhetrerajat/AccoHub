import React, { Component, PropTypes } from 'react';
import __ from 'underscore';

import Item from './Item.jsx';


class Search extends Component{
  handleInputChange(e){
    this.props.searchInputCallback(e.target.value)
  }

  sortByType(data, sortType){
    switch (sortType) {
      case 'rating':
        return __.sortBy(data, 'rating')
        break;
      default:
        return data
    }
  }
  render(){
    // props
    const { sortType, menu, likes, error } = this.props;

    // var declare
    let countResult = this.props.menu.length;
    let renderContent, filteredResults, tagsList, tagsSuggestions;

    //check if searchText is empty
    filteredResults = this.props.menu.filter((item) => item.tags.indexOf(this.props.searchText) !== -1)

    //generate tags List
    //tagsList = __.uniq(__.flatten(this.props.menu.map((mapItem) => mapItem.tags.map((item) => item.trim()))))
    //tagsSuggestions = tagsList.length==0 ? "No Suggestions" : tagsList.reduce((prevVal, item) => item.match(this.props.searchText))

    //check if data is fetched or not
    if(this.props.isFetched){
      if(!error.length){
        renderContent = <ResultList menu={this.sortByType(menu,sortType)} handleLikeToggleCallback={this.props.handleLikeToggleCallback.bind(this)} likes={likes}/>
      }else{
        renderContent = error
      }

    }else{
      renderContent = <Loading/>
    }
    return(
      <div className="search">
        <input type="text" placeholder="Search here..." onChange={this.handleInputChange.bind(this)}/>
        {renderContent}
      </div>
    );
  }
}

Search.propTypes = {
  sortType : PropTypes.string,
  menu : PropTypes.array.isRequired,
  handleLikeToggleCallback : PropTypes.func.isRequired,
  searchInputCallback : PropTypes.func.isRequired,
  searchText : PropTypes.string,
  isFetched : PropTypes.bool,
}

class ResultList extends Component{
  render(){
    const { menu} = this.props;
    let resultList = menu.map((item) => <Item key={item.name}
    name={item.name}
    rating={item.rating}
    image={item.image}
    tags={item.tags}
    description={item.description}
    link={item.link}
    handleLikeToggleCallback={this.props.handleLikeToggleCallback.bind(this)}
    likes={this.props.likes[item.name] || 0}/>)
    return(
      <div className="search_results">
        <p>Result : <strong>{menu.length}</strong> items found.</p>
        <div className="result_list">
          {resultList}
        </div>
      </div>
    );
  }
}

ResultList.propTypes = {
  menu : PropTypes.array.isRequired,
  handleLikeToggleCallback : PropTypes.func.isRequired,
}

class Loading extends Component{
  render(){
    return(
      <div className="loading">
        <img src="../images/ball.gif"/>
        <h4>Loading...</h4>
      </div>
    );
  }
}

export default Search;
