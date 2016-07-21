import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setAddress } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import styles from './Form.scss';

const dataCountries = require('./data/countries.json');
const dataCities = require('./data/cities.json');

@connect(
  state => ({
    auth: state.auth
  }),
  {setAddress, pushState: push })
export default class Form2 extends Component {
  static propTypes = {
    auth: PropTypes.object,
    setAddress: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  state = {
    country: '',
    countryKey: -1,
    cities: [],
    city: ''
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.pushState('/auth/step/3');
  }

  save() {
    const { country, city } = this.state;
    this.props.setAddress(country, city);
  }

  back() {
    this.props.pushState('/auth/step/1');
  }

  changeCountry(ev) {
    const value = ev.target.value;
    this.setState({
      country: value
    });
    if (value.length > 0) {
      const isMatch = Object.keys(dataCountries).some(el => {
        if (dataCountries[el] === value) {
          const countryKey = Number(el);
          const cities = countryKey > -1 ? Object.keys(dataCities).map(elm => {
            if (dataCities[elm].country === countryKey) {
              return dataCities[elm].name;
            }
          }).filter(elm => elm) : [];
          this.setState({
            countryKey: countryKey,
            cities: cities
          });
          if (cities.length === 1) {
            this.setState({
              city: cities[0]
            });
          } else {
            this.setState({
              city: '',
              countryKey: -1
            });
          }
          return true;
        }
      });
      if (!isMatch) {
        this.setState({
          countryKey: -1,
          city: '',
          cities: []
        });
      }
    } else {
      this.setState({
        city: '',
        countryKey: -1
      });
    }
  }

  changeCity(ev) {
    this.setState({
      city: ev.target.value
    });
  }

  render() {
    const { cities } = this.state;
    const isDataProvided = !(this.state.country.length > 0);
    return (
      <form className={styles.form} onSubmit={(ev) => this.handleSubmit(ev)}>
        <header className={styles.form__header}>
          <h3 className={styles.form__title}>2. Выберите страну и город</h3>
        </header>
        <div className={styles.form__content}>
          <label className={styles.form__label}>
            <input className={styles.form__input} value={this.state.country} onChange={(ev) => this.changeCountry(ev)} list="countries" placeholder="Страна" />
            <datalist id="countries">
              {Object.keys(dataCountries).map((key) => <option key={key} value={dataCountries[key]} />)}
            </datalist>
          </label>
          <label className={styles.form__label}>
            <input className={styles.form__input} value={this.state.city} onChange={(ev) => this.changeCity(ev)} list="cities" placeholder="Город" />
            <datalist id="cities">
              {cities.map((city, id) => <option key={id} value={city} />)}
            </datalist>
          </label>
        </div>
        <footer className={styles.form__footer}>
          <button className={styles.form__button} onClick={() => this.back()} type="button">Предыдущий</button>
          <button className={styles.form__button} disabled={isDataProvided} onClick={() => this.save()}>Следующий</button>
        </footer>
      </form>
    );
  }
}
