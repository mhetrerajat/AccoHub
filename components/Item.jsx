import React, {Component, PropTypes} from 'react';

class Item extends Component{

  handleLikeToggle(e){
    e.preventDefault();
    let form,name,count,type;
    form = this.refs.toggleLikeForm;
    name = form.name.value;
    count = parseInt(form.count.value);
    type = parseInt(form.type.value);
    this.props.handleLikeToggleCallback(name, count, type);
  }

  render(){
    const { name, image, rating, description, link, tags, likes} = this.props;
    //const count = 0;
    let type = 1;
    let printTags = tags.map((tag) => <Tag key={tag} tag={tag}/>);

    return(
      <div className="result_item container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h2><a href={link} target="_blank">{name}</a></h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <p>Rating : <strong>{rating}</strong></p>
          </div>
          <div className="col-sm-8">
            Tags : {printTags}
          </div>
          <div className="col-sm-1">
              <form ref="toggleLikeForm" id="toggleLikeForm" onSubmit={this.handleLikeToggle.bind(this)}>
                <strong>{likes}</strong>&nbsp;
                <input type="hidden" name="name" value={name}/>
                <input type="hidden" name="count" value={likes}/>
                <input type="hidden" name="type" value={type}/>
                <button type="submit">{ type ? "Like" : "Unlike"}</button>
              </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="imageBox"><img src={image}/></div>
          </div>
          <div className="col-sm-9">
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  description : PropTypes.string,
  handleLikeToggleCallback : PropTypes.func.isRequired,
  image : PropTypes.string,
  link : PropTypes.string,
  name : PropTypes.string,
  rating : PropTypes.string
}

class Tag extends Component{
  render(){
    const {tag} = this.props;
    return(
      <span><strong>{tag},&nbsp;</strong></span>
    );
  }
}

Tag.propTypes = {
  tag : PropTypes.string
}

export default Item;
