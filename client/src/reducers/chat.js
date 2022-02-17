import {
  USER_FOUND,
  USER_NOT_FOUND,
  CLEAR_SEARCH,
  SET_SELECTED_CHAT
} from '../actions/types';

const initialState = {
  search: {
    _id: null,
    name: '',
    email: '',
    date: ''
  },
  selectedChat: {
    _id: '',
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const  { type, payload } = action;
  switch(type) {
    case USER_FOUND:
      return { search: { ...payload }, ...state };
    case SET_SELECTED_CHAT:
      return { ...state, selectedChat: { _id: payload } }
    case USER_NOT_FOUND:
    case CLEAR_SEARCH:
        return { 
          search: {
            _id: null,
            name: '',
            email: '',
            date: ''
          }
        };
    default:
      return state;
  }
}