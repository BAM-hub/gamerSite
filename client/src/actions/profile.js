import axios from "axios";
import {
  PROFILE_FOUND,
  PROFILE_NOT_FOUND
} from './types';

export const getProfile = (email) => async dispatch => {
  try {
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let body = JSON.stringify(email);

    let res = await axios.get('/api/profile', body, config);
    console.log(res);
    dispatch({
      type: PROFILE_FOUND,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_NOT_FOUND
    });
  }

};