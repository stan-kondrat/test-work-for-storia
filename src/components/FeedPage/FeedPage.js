/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './FeedPage.css';

@withStyles(styles)
class FeedPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  render() {
    const title = 'Storia demo client';
    this.context.onSetTitle(title);
    return (
      <div className="FeedPage">
        <div className="FeedPage-container">
          {title}
        </div>
      </div>
    );
  }

}

export default FeedPage;
