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
        'content-type': 'multipart/encrypted',
        'x-auth-token': localStorage.getItem('x-auth-token')
      }
    };


    if(image !== '') {
      try {
        await axios.delete(`api/images/delete-avatar/${email}/${image}`, {
          headers: {
            'x-auth-token': localStorage.getItem('x-auth-token'),
          }
        });
        dispatch({
          type: IMAGE_DELETED
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: IMAGE_DELETE_FAIL
        });
        return;
      }
    }

    let body = new FormData();
    body.append('file', file, file.name);
    let res = await axios.post(`/api/images/upload/${email}/avatar`, body, config);
    
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

export const editGameList = (gameList, email, token) => async dispatch => {

  try {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };
    let newGamlist = gameList.map(game => {
      let {name, score, tags} = game;
      return {name, score, tags};
    });


    let body = JSON.stringify({ 'gameList': newGamlist, email });
    let res = await axios.post('api/games/add-game-to-profile', body, config);

    let existingGames = res.data.existingGames[0];

    config = {
      headers: {
        'content-type': 'multipart/encrypted',
        'x-auth-token': localStorage.getItem('x-auth-token')
      }
    };


    existingGames.map(async (game ,i) => {
      
      if(i === existingGames.length -1 && !game) {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        let res = await axios.get(`api/games/game-list/${email}`, config);
          dispatch({
            type: GAME_LIST_UPDATED,
            payload: res.data
          });
      }

      if(!game) return;
      console.log(gameList[i].image , gameList[i].image.name);

      body = new FormData();
      body.append('file', gameList[i].image , gameList[i].image.name);

      await axios.post(`api/images/upload/${email}/Games:${gameList[i].name}`, body, config);
      
      if(i === existingGames.length -1) {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        };
        let res = await axios.get(`api/games/game-list/${email}`, config);
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