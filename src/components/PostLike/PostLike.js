import React, { Component } from 'react';
import styles from './PostLike.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class PostLike extends Component {
  constructor(props) {
    super(props);
    this.state = {liked: false, likes: props.likes};
  }
  likeHandler() {
    let likes = this.props.likes;
    if(!this.state.liked){
      likes++;
    }
    this.setState({liked: !this.state.liked, likes: likes });
  }
  render() {
    return (
      <div className="postLike" onClick={this.likeHandler.bind(this)}>
        {this.state.likes}
        <span  className="postLike-button">
          {this.state.liked?'unlike':'like'}
        </span>
      </div>
    );
  }

}

export default PostLike;
