import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setAvatar } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import styles from './Form.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const images = [
  {
    src: require('./images/cat1.jpg'),
    type: 'cat'
  },
  {
    src: require('./images/cat2.jpg'),
    type: 'cat'
  },
  {
    src: require('./images/cat3.jpg'),
    type: 'cat'
  },
  {
    src: require('./images/dog4.jpg'),
    type: 'dog'
  }
];

@connect(
  state => ({
    auth: state.auth
  }),
  { setAvatar, pushState: push })
export default class Form4 extends Component {
  static propTypes = {
    auth: PropTypes.object,
    setAvatar: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  state = {
    id: -1
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.pushState('/auth/profile');
  }

  save() {
    if (this.state.id > -1) {
      this.props.setAvatar(images[this.state.id].src);
    }
  }

  back() {
    this.props.pushState('/auth/step/3');
  }

  handleClick(id) {
    this.setState({
      id: id
    });
  }

  render() {
    const isCat = this.state.id > -1 ? images[this.state.id].type === 'dog' : false;
    return (
      <form className={styles.form} onSubmit={(ev) => this.handleSubmit(ev)}>
        <header className={styles.form__header}>
          <h3 className={styles.form__title}>4. Выберите любимого котика</h3>
        </header>
        <div className={styles.form__content}>
          {images.map((el, id) => {
            return (
              <figure key={id} className={cx({
                [styles.form__figure]: true,
                [styles.form__figure____selected]: this.state.id === id
              })} onClick={() => this.handleClick(id)}>
                <img className={styles.form__image} src={el.src} />
              </figure>
            );
          })}
        </div>
        <div className={cx({
          [styles.form__error]: true,
          [styles.form__error____show]: isCat
        })}>
          <span className={styles.form__errorMessage}>Вы выбрали собачку. А надо котика.</span>
        </div>
        <footer className={styles.form__footer}>
          <button className={styles.form__button} onClick={() => this.back()} type="button">Предыдущий</button>
          <button className={cx({
            [styles.form__button]: true,
            [styles.form__button____submit]: true
          })} disabled={isCat} onClick={() => this.save()}>Завершить</button>
        </footer>
      </form>
    );
  }
}
