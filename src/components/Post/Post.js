/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Post.css';
import withStyles from '../../decorators/withStyles';
import PostLike from '../PostLike';

@withStyles(styles)
class Post extends Component {
  getImageUrl(){
    //Выборочная картинка из момента должна соответствовать следующему критерию:
    //В массиве аттачментов это должна быть либо первая картинка с конца, не
    //имеющая цифр в поле file.title, либо самая последняя картинка, если
    //удовлетворяющих условию картинок нет.
    const attachments = this.props.data.attachments || [];

    if(!attachments.length) return;

    let lastImageUrl = false; // либо самая последняя картинка

    for(let i=attachments.length-1; i>=0; i--){
      if(attachments[i].type !== "Image") continue;
      if(!lastImageUrl) lastImageUrl = attachments[i].file.path;
      if(!attachments[i].file.title.match(/\d+/g)){ //имеющая цифр в поле file.title
        return attachments[i].file.path;
      }
    }
    return lastImageUrl;
  }

  render() {
    return (
      <div className="Post">
        <div className="Post-title"> {this.props.data.title} </div>
        <div className="Post-storyTitle"> {this.props.data.storyTitle} </div>
        <div className="Post-ownerName"> {this.props.data.owner.name} </div>
        <img className="Post-image" src={this.getImageUrl()} />
        <PostLike likes={this.props.data.stats.likes} momentId={this.props.data.id} storyId={this.props.data.storyId} />
      </div>
    );
  }

}

export default Post;
