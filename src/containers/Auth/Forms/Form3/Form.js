import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setSocial } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import { Social } from 'components';
import styles from './Form.scss';

@connect(
  state => ({
    auth: state.auth
  }),
  { setSocial, pushState: push })
export default class Form3 extends Component {
  static propTypes = {
    auth: PropTypes.object,
    setSocial: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  state = {
    facebook: '',
    vk: '',
    twitter: '',
    ok: ''
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.pushState('/auth/step/4');
  }

  save() {
    this.props.setSocial(this.state);
  }

  back() {
    this.props.pushState('/auth/step/2');
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <form className={styles.form} onSubmit={(ev) => this.handleSubmit(ev)}>
        <header className={styles.form__header}>
          <h3 className={styles.form__title}>3. Отметьте социальные сети</h3>
        </header>
        <div className={styles.form__content}>
          <Social
            key="facebook"
            placeholder="Ваша страница в Facebook"
            name="facebook"
            onUpdate={(key, value) => this.handleChange(key, value)} />
          <Social
            key="vk"
            placeholder="Ваша страница в VK"
            name="vk"
            onUpdate={(key, value) => this.handleChange(key, value)} />
          <Social
            key="twitter"
            placeholder="Ваша страница в Twitter"
            name="twitter"
            onUpdate={(key, value) => this.handleChange(key, value)} />
          <Social
            key="ok"
            placeholder="Ваша страница в OK"
            name="ok"
            onUpdate={(key, value) => this.handleChange(key, value)} />
        </div>
        <footer className={styles.form__footer}>
          <button className={styles.form__button} onClick={() => this.back()} type="button">Предыдущий</button>
          <button className={styles.form__button} onClick={() => this.save()}>Следующий</button>
        </footer>
      </form>
    );
  }
}
