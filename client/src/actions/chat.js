import axios from 'axios';
import {
  USER_FOUND,
  USER_NOT_FOUND
} from './types';

export const findChat = (email) => async dispatch => {
  
}

export const getUserByEmail = (email) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json' 
      }
    }
    const res = await axios.get(`/api/chat/get-user-by-email/${email}`, config);
    if(res.data === 'User Not Found!') {
      return dispatch({
        type: USER_NOT_FOUND
      });
    }
    dispatch({
      type: USER_FOUND,
      payload: res.data
    });
    return res?.data;
} catch (err) {
    console.log(err);
    dispatch({
      type: USER_NOT_FOUND
    });
  }
}