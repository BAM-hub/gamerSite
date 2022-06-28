import {
  USER_FOUND,
  USER_NOT_FOUND,
  CLEAR_SEARCH,
  SET_SELECTED_CHAT,
  CONVERSATION_FOUND,
  CONVERSAITION_CREATED,
  NEW_MESSAGE,
  CHAT_ALERTS_FOUND,
  CHAT_ALERTS_NOT_FOUND,
  NEW_CHAT,
} from "../actions/types";

const initialState = {
  search: {
    _id: null,
    name: "",
    email: "",
    date: "",
  },
  selectedChat: {
    _id: "",
  },
  chats: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_FOUND:
      return { ...state, search: { ...payload } };
    case SET_SELECTED_CHAT:
      return { ...state, selectedChat: { _id: payload } };
    case CONVERSATION_FOUND:
      const updateChats = state.chats.map((chat) => {
        if (chat.conversationId === payload.conversationId)
          return {
            ...payload,
            ...chat,
          };
        return chat;
      });
      return {
        ...state,
        chats: updateChats,
      };
    case CONVERSAITION_CREATED:
      const { conversationId, recipientName, recipientEmail, users } = payload;
      return {
        ...state,
        chats: [
          ...state.chats,
          {
            conversationId: conversationId,
            conversation: [],
            alert: {
              message: "Empty",
              count: 0,
            },
            recipientName,
            recipientEmail,
            users,
          },
        ],
      };
    case NEW_MESSAGE:
      const { id, msg, selectedChatId } = payload;
      let newConversations = state.chats.map((convo) => {
        if (id === convo.conversationId && id === selectedChatId) {
          return {
            ...convo,
            conversation: [...convo.conversation, msg],
            alert: {
              message: msg.message,
              count: 0,
            },
          };
        }
        if (id === convo.conversationId) {
          return {
            ...convo,
            conversation: [...convo.conversation, msg],
            alert: {
              message: msg.message,
              count: ++convo.alert.count,
            },
          };
        }
        return convo;
      });
      newConversations = newConversations.sort(
        (a, b) =>
          new Date(b.alert.message.time || new Date(1900, 0, 1)) -
          new Date(a.alert.message.time || new Date(1900, 0, 1))
      );
      return {
        ...state,
        chats: newConversations,
      };
    case USER_NOT_FOUND:
    case CLEAR_SEARCH:
      return {
        ...state,
        search: {
          _id: null,
          name: "",
          email: "",
          date: "",
        },
      };
    case NEW_CHAT:
      const { convoId, myName, myEmail } = payload;
      return {
        ...state,
        chats: [
          ...state.chats,
          {
            alert: {
              count: 0,
              message: "Empty",
            },
            conversationId: convoId,
            recipientEmail: myEmail,
            recipientName: myName,
          },
        ],
      };
    case CHAT_ALERTS_FOUND:
      return {
        ...state,
        chats: payload,
      };
    case CHAT_ALERTS_NOT_FOUND:
    default:
      return state;
  }
}
