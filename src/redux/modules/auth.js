const RESET = 'action:auth/RESET';
const SET_INFO = 'action:auth/SET_INFO';
const SET_ADDRESS = 'action:auth/SET_ADDRESS';
const SET_SOCIAL = 'action:auth/SET_SOCIAL';
const SET_AVATAR = 'action:auth/SET_AVATAR';

const initialState = {
  steps: [false, false, false, false],
  name: '',
  email: '',
  country: '',
  city: '',
  social: {
    fb: '',
    vk: '',
    twitter: '',
    ok: ''
  },
  avatar: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET:
      return {
        steps: [false, false, false, false],
        name: '',
        email: '',
        country: '',
        city: '',
        social: {
          facebook: '',
          vk: '',
          twitter: '',
          ok: ''
        },
        avatar: ''
      };
    case SET_INFO:
      return Object.assign({}, state, {
        steps: action.name && action.name.length > 0 && action.email && action.email.length > 0 ? state.steps.map((step, id) => id === 0 ? true : step) : state.steps,
        name: action.name,
        email: action.email
      });
    case SET_ADDRESS:
      return Object.assign({}, state, {
        steps: action.country && action.country.length > 0 ? state.steps.map((step, id) => id === 1 ? true : step) : state.steps,
        country: action.country,
        city: action.city
      });
    case SET_SOCIAL:
      return Object.assign({}, state, {
        steps: state.steps.map((step, id) => id === 2 ? true : step),
        social: Object.assign({}, state.social, action.social)
      });
    case SET_AVATAR:
      return Object.assign({}, state, {
        steps: action.avatar && action.avatar.length > 0 ? state.steps.map((step, id) => id === 3 ? true : step) : state.steps,
        avatar: action.avatar
      });
    default:
      return state;
  }
}

export function reset() {
  return {
    type: RESET
  };
}

export function setInfo(name, email) {
  return {
    type: SET_INFO,
    name,
    email
  };
}

export function setAddress(country, city) {
  return {
    type: SET_ADDRESS,
    country,
    city
  };
}

export function setSocial(social) {
  return {
    type: SET_SOCIAL,
    social
  };
}

export function setAvatar(avatar) {
  return {
    type: SET_AVATAR,
    avatar
  };
}
