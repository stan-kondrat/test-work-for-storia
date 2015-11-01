/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './FeedPage.css';
import Post from '../Post';

@withStyles(styles)
class FeedPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {items: props.items || []};
  }

  render() {
    const title = 'Storia demo client';
    this.context.onSetTitle(title);
    var postNodes = this.state.items.map(function (post) {
      return (
        <Post data={post.objectPreview} />
      );
    });

    return (
      <div className="FeedPage">
        <div className="FeedPage-container">
          <h1>{title}</h1>
          {postNodes}
        </div>
      </div>
    );
  }

}

export default FeedPage;
