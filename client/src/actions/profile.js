import axios from "axios";
import {
  PROFILE_FOUND,
  PROFILE_NOT_FOUND,
  PROFILE_CREATED,
  PROFILE_CREATE_ERROR
} from './types';
import FormData from 'form-data'

export const getProfile = (email) => async dispatch => {
  try {
    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let res = await axios.get(`/api/profile/${email}`, config);
    dispatch({
      type: PROFILE_FOUND,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_NOT_FOUND,
    });
  }

};

export const uploadImage = (file) => async dispatch => {
  try {
    let config = {
      headers: {
        'content-type': 'multipart/encrypted'
      }
    };

    let body = new FormData();
    body.append('file', file, file.name);
    let res = await axios.post('/api/profile/upload', body, config);

    return res.data;

  } catch (err) {
    console.log(err);
  }
};

export const createProfile = (formData, token) => async dispatch => {
  try {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    let res = await axios.post('/api/profile/create-profile', formData, config);
    console.log(res);
    dispatch({
      type: PROFILE_CREATED,
      payload: res.data
    });

  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_CREATE_ERROR
    });
  }
};