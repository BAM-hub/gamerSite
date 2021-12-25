import axios from "axios";
import {
  PROFILE_FOUND,
  PROFILE_NOT_FOUND,
  PROFILE_CREATED,
  PROFILE_CREATE_ERROR,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILED,
  IMAGE_DELETED,
  IMAGE_DELETE_FAIL,
  GAME_LIST_UPDATED
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

export const uploadImage = (file, email, image) => async dispatch => {
  try {
    let config = {
      headers: {
        'content-type': 'multipart/encrypted'
      }
    };


    if(image !== '') {
      try {
        axios.delete(`api/profile/delete-avatar/${email}/${image}`);
        dispatch({
          type: IMAGE_DELETED
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: IMAGE_DELETE_FAIL
        });
      }
    }

    let body = new FormData();
    body.append('file', file, file.name);
    let res = await axios.post(`/api/profile/upload/${email}/avatar`, body, config);
    
    dispatch({
      type: UPLOAD_IMAGE,
      payload: res.data
    });
    return res.data;

  } catch (err) {
    console.log(err);
    dispatch({
      type: UPLOAD_IMAGE_FAILED
    });
  }
};

export const createProfile = (formData, token, email) => async dispatch => {
  try {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    formData = {
      ...formData,
      email: email
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

export const editGameList = (gameList, images, email, token) => async dispatch => {
  try {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    let body = JSON.stringify({ gameList, email });

    let res = await axios.post('api/games/add-game-to-profile', body, config);

    let existingGames = res.data.existingGames[0];
    
    config = {
      headers: {
        'content-type': 'multipart/encrypted'
      }
    };

    existingGames.map(async (game ,i) => {
      if(!game) return;

      body = new FormData();
      body.append('file', images[i], images[i].name);

      await axios.post(`api/profile/upload/${email}/Games:${gameList[i].name}`, body, config);

      if(i === existingGames.length -1) {
        config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
      
          res = await axios.get(`api/games/game-list/${email}`, config);
          dispatch({
            type: GAME_LIST_UPDATED,
            payload: res.data
          });
      }
    });

  } catch (err) {
    console.log(err);
  }
} 