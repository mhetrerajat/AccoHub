import React, { Component } from 'react';

class SortByPanel extends Component{
  handleSortFilter(e){
    e.preventDefault();
    let sortElement = this.refs.sortByForm.searchSort.value;
    this.props.handleSortFilterCallback(sortElement);
  }
  render(){
    return(
        <ul id="sort_panel">
          <h4>Sort By</h4>
            <form name="sortByForm" ref="sortByForm" onSubmit={this.handleSortFilter.bind(this)}>
              <li>
                <span><input type="radio" name="searchSort" value="likes"/>&nbsp;</span>
                Likes
              </li>
              <li><span><input type="radio" name="searchSort" value="rating" />&nbsp;</span>Ratings</li>
              <button type="submit">Sort Results</button>
            </form>
        </ul>
  );
  }
}

export default SortByPanel;
