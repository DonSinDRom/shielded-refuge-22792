import React, { Component, PropTypes } from 'react';
import styles from './App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <main className={styles.app}>
        {this.props.children}
      </main>
    );
  }
}
