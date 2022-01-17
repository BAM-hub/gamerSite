import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGGEDIN,
  SOCKET_CONNECTION,
  SOCKET_CLOSE
} from '../actions/types';

const initialState = { 
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  email: '',
  name: '',
  socket: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGGEDIN:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('tokent');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        socket: state.socket
      };
    case SOCKET_CONNECTION:
    case SOCKET_CLOSE:
      return {
        ...state,
        socket: payload
      }
    default:
      return state;
  };
};