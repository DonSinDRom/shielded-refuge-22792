import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Social.scss';

const cx = classNames.bind(styles);

export default class Social extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onUpdate: PropTypes.func
  }

  state = {
    value: '',
    checked: false
  }

  changeText(ev) {
    const { onUpdate, name } = this.props;
    const value = ev.target.value;
    this.setState({
      value: value
    });
    onUpdate(name, value);
  }

  toggleInput() {
    const { onUpdate, name } = this.props;
    const { checked, value } = this.state;
    this.setState({
      checked: !checked
    });
    if (checked) {
      onUpdate(name, '');
    } else {
      onUpdate(name, value);
    }
  }

  render() {
    const { placeholder, name } = this.props;
    const { checked } = this.state;

    return (
      <div className={styles.social}>
        <label className={styles.social__label}>
          <input className={styles.social__checkbox} checked={this.state.checked} onChange={() => this.toggleInput()} type="checkbox" />
          <span className={styles.social__checkbox_name}>{name}</span>
        </label>
        <input className={cx({
          [styles.social__input]: true,
          [styles.social__input____enabled]: checked
        })} value={this.state.value} onChange={(ev) => this.changeText(ev)} placeholder={placeholder} type="text" />
      </div>
    );
  }
}
