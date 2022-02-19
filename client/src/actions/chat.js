import axios from 'axios';
import {
  USER_FOUND,
  USER_NOT_FOUND,
  CLEAR_SEARCH,
  SET_SELECTED_CHAT,
  CONVERSATION_FOUND,
  CONVERSATION_NOT_FOUND,
  CONVERSAITION_CREATED,
  CONVERSATION_CREATE_FAIL
} from './types';


export const createChat = (creator, recipient) => async dispatch => {
  try {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ creator, recipient });
    const res = await axios.post('/api/chat/create-conversation', body, config);
    dispatch({
      type: CONVERSAITION_CREATED,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONVERSATION_CREATE_FAIL
    });
  }
}

export const findChat = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.get(`/api/chat/${id}`, config);
    dispatch({
      type: CONVERSATION_FOUND,
      payload: res.data
    })
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONVERSATION_NOT_FOUND
    });
  }
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

export const clearSearch = () => dispatch => dispatch({ type: CLEAR_SEARCH });
export const selectChat = id => dispatch => dispatch({ type: SET_SELECTED_CHAT, payload: id });