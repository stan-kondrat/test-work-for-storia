/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Post.css';
import withStyles from '../../decorators/withStyles';
import PostLike from '../PostLike';

@withStyles(styles)
class Post extends Component {

  render() {
    return (
      <div className="Post">
        <div className="Post-title"> {this.props.data.title} </div>
        <div className="Post-storyTitle"> {this.props.data.storyTitle} </div>
        <div className="Post-ownerName"> {this.props.data.owner.name} </div>
        <PostLike likes={this.props.data.stats.likes} momentId={this.props.data.id} storyId={this.props.data.storyId} />
      </div>
    );
  }

}

export default Post;
