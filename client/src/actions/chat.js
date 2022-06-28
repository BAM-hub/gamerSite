import axios from "axios";
import {
  USER_FOUND,
  USER_NOT_FOUND,
  CLEAR_SEARCH,
  SET_SELECTED_CHAT,
  CONVERSATION_FOUND,
  CONVERSATION_NOT_FOUND,
  CONVERSAITION_CREATED,
  CONVERSATION_CREATE_FAIL,
  NEW_MESSAGE,
  CHAT_ALERTS_FOUND,
  CHAT_ALERTS_NOT_FOUND,
} from "./types";

export const createChat = (creator, recipient) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ creator, recipient });
    const res = await axios.post("/api/chat/create-conversation", body, config);
    const recipienName = res.data.users.filter(
      (user) => user.email === recipient
    );

    dispatch({
      type: CONVERSAITION_CREATED,
      payload: {
        conversationId: res.data.conversationId,
        recipientName: recipienName[0].name,
        recipientEmail: recipient,
        users: res.data.users,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONVERSATION_CREATE_FAIL,
    });
  }
};

export const findChat = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res;
    do {
      res = await axios.get(`/api/chat/${id}`, config);
    } while (res.data === "");
    dispatch({
      type: CONVERSATION_FOUND,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONVERSATION_NOT_FOUND,
    });
  }
};

export const getUserByEmail = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(`/api/chat/get-user-by-email/${email}`, config);
    if (res.data === "User Not Found!") {
      return dispatch({
        type: USER_NOT_FOUND,
      });
    }
    dispatch({
      type: USER_FOUND,
      payload: res.data,
    });
    return res?.data;
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_NOT_FOUND,
    });
  }
};

export const newMessage =
  (id, selectedChatId, msg, chats) => async (dispatch) => {
    const chatFetched = chats.filter((chat) => chat.conversationId === id);
    if (!chatFetched[0].conversation) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get(`/api/chat/${id}`, config);
        dispatch({
          type: CONVERSATION_FOUND,
          payload: res.data,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: CONVERSATION_NOT_FOUND,
        });
      }
    }
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        id: id,
        msg: msg,
        selectedChatId: selectedChatId,
      },
    });
  };

export const getUserAlerts = (id, email, conversations) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `/api/chat/get-user-alerts/${id}/${email}`,
      config
    );
    const newChats = res.data.map((alert) => {
      const newConvo = conversations.filter(
        (convo) => convo.conversationId === alert.conversationId
      );
      return {
        alert: alert.alert.alerts,
        ...newConvo[0],
      };
    });

    dispatch({
      type: CHAT_ALERTS_FOUND,
      payload: newChats,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CHAT_ALERTS_NOT_FOUND,
    });
  }
};

export const clearSearch = () => (dispatch) => dispatch({ type: CLEAR_SEARCH });
export const selectChat = (id) => (dispatch) =>
  dispatch({ type: SET_SELECTED_CHAT, payload: id });
