import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import styles from './Profile.scss';

@connect(
  state => ({
    auth: state.auth
  }),
  { reset, pushState: push })
export default class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object,
    reset: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  reset() {
    this.props.reset();
    this.props.pushState('/auth/step/1');
  }

  render() {
    const { name, email, country, city, social, avatar } = this.props.auth;
    return (
      <div className={styles.profile}>
        <div className={styles.profile__card}>
          <header className={styles.profile__header}>
            <hgroup className={styles.profile__headers}>
              <h2 className={styles.profile__name}>{name}</h2>
              <h3 className={styles.profile__email}>{email}</h3>
            </hgroup>
            <address className={styles.profile__address}>
              <span className={styles.profile__country}>{country}</span>
              <span className={styles.profile__addressDivider}>, </span>
              <span className={styles.profile__city}>{city}</span>
            </address>
            <ul className={styles.profile__socialList}>
              {Object.keys(social).map(key => {
                if (social[key].length > 0) {
                  return (
                    <li key={key} className={styles.profile__socialItem}>
                      <a className={styles.profile__socialLink} href={'http://' + social[key]}>{key}:</a>&nbsp;
                      <span className={styles.profile__socialText}>{social[key]}</span>
                    </li>
                  );
                }
              })}
            </ul>
          </header>
          <figure className={styles.profile__avatar}>
            <img className={styles.profile__avatarImage} src={avatar} />
          </figure>
        </div>
        <button className={styles.profile__button} onClick={() => this.reset()}>Пройти заново</button>
      </div>
    );
  }
}
