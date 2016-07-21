import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './Step.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

@connect(
  state => ({
    steps: state.auth.steps
  }))
export default class Step extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired
  };

  render() {
    const { steps } = this.props;
    return (
      <section className={styles.step}>
        <header className={styles.step__header}>
          <nav className={styles.step__nav}>
            {steps.map((step, index) => {
              const id = index + 1;
              return (
                <Link key={id} className={cx({
                  [styles.step__navItem]: true,
                  [styles.step__navItem____completed]: step
                })} to={'/auth/step/' + id} activeClassName={styles.step__navItem____active}>{id}</Link>
              );
            })}
          </nav>
        </header>
        <div className={styles.step__content}>
          {this.props.children}
        </div>
      </section>
    );
  }
}
