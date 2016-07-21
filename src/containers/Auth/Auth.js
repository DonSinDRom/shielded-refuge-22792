import React, { Component, PropTypes } from 'react';
import styles from './Auth.scss';

export default class Auth extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <section className={styles.auth}>
        {this.props.children}
      </section>
    );
  }
}
