import {
  PROFILE_FOUND,
  PROFILE_NOT_FOUND,
  PROFILE_CREATED,
  PROFILE_CREATE_ERROR,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILED,
  IMAGE_DELETED,
  IMAGE_DELETE_FAIL
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
  }],
  "image": ""
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case PROFILE_FOUND:
    case PROFILE_CREATED:
      return {
        ...payload
    };
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: payload
      };
    case IMAGE_DELETED:
      return {
        ...state,
        image: ''
      };  
    case UPLOAD_IMAGE_FAILED:
    case PROFILE_NOT_FOUND:
    case PROFILE_CREATE_ERROR:
    case IMAGE_DELETE_FAIL:
    default:
    return state;
  };
};