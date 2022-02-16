import {
  USER_FOUND,
  USER_NOT_FOUND
} from '../actions/types';

const initialState = {
  search: {
    _id: null,
    name: '',
    email: '',
    date: ''
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const  { type, payload } = action;
  switch(type) {
    case USER_FOUND:
      return { search: { ...payload } };
    case USER_NOT_FOUND:
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