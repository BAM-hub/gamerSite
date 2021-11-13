import {
  PROFILE_FOUND,
  PROFILE_NOT_FOUND
} from '../actions/types';


const initialState = { 
  "staredGame": {
    "name": '',
    "score": 10,
    "tags": []
  },
  "social": {
    "facebook": "",
    "instagram": "",
    "whatsapp": ""
  },
  "name": "",
  'PreferedConsole': '',
  'gameList': [{
    'name': '',
    'score': 0
  }]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case PROFILE_FOUND:
      return {
        ...payload
    };
    case PROFILE_NOT_FOUND:
    default:
    return state;
  };
};