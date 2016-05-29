import React, { Component } from 'react';
import __ from 'underscore';

class LikesPanel extends Component{
  render(){
    const {likes} = this.props;
    let sum = 0;
    const likeVals = Object.keys(likes).map(key => likes[key]);
    for(let i=0; i<likeVals.length; i++){
      sum += parseInt(likeVals[i])
    }
    return(
    <div>
      <h4>Total Likes : {sum}</h4>
    </div>
  );
  }
}

export default LikesPanel;
