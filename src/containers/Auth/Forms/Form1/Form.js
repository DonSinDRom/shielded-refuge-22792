import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setInfo } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import styles from './Form.scss';

@connect(
  state => ({
    auth: state.auth
  }),
  { setInfo, pushState: push })
export default class Form1 extends Component {
  static propTypes = {
    auth: PropTypes.object,
    setInfo: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  state = {
    name: '',
    email: ''
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.pushState('/auth/step/2');
  }

  save() {
    const { name, email } = this.state;
    this.props.setInfo(name, email);
  }

  handleChange(ev, key) {
    this.setState({
      [key]: ev.target.value
    });
  }

  render() {
    const { name, email } = this.state;
    const isDataProvided = !(name.length > 0 && email.length > 0);
    return (
      <form className={styles.form} onSubmit={(ev) => this.handleSubmit(ev)}>
        <header className={styles.form__header}>
          <h3 className={styles.form__title}>1. Введите имя и e-mail</h3>
        </header>
        <div className={styles.form__content}>
          <label className={styles.form__label}>
            <input className={styles.form__input} value={this.state.name} onChange={(ev) => this.handleChange(ev, 'name')} type="text" placeholder="Имя" />
          </label>
          <label className={styles.form__label}>
            <input className={styles.form__input} value={this.state.email} onChange={(ev) => this.handleChange(ev, 'email')} type="email" placeholder="E-mail" />
          </label>
        </div>
        <footer className={styles.form__footer}>
          <button className={styles.form__button} disabled>Предыдущий</button>
          <button className={styles.form__button} disabled={isDataProvided} onClick={() => this.save()}>Следующий</button>
        </footer>
      </form>
    );
  }
}
