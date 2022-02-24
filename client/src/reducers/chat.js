import {
  USER_FOUND,
  USER_NOT_FOUND,
  CLEAR_SEARCH,
  SET_SELECTED_CHAT,
  CONVERSATION_FOUND,
  CONVERSAITION_CREATED,
  NEW_MESSAGE
} from '../actions/types';

const initialState = {
  search: {
    _id: null,
    name: '',
    email: '',
    date: ''
  },
  selectedChat: {
    _id: '',
  },
  chats: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
  const  { type, payload } = action;
  switch(type) {
    case USER_FOUND:
      return { ...state, search: {...payload} };
    case SET_SELECTED_CHAT:
      return { ...state, selectedChat: { _id: payload } }
    case CONVERSATION_FOUND:
      return {
        ...state,
        chats: [...state.chats, payload]
      }
    case CONVERSAITION_CREATED:
      const { conversationId } = payload;
      return {
        ...state,
        chats: [
          ...state.chats, {
          conversationId: conversationId,
          conversation: []
        }]
      }
    case NEW_MESSAGE:
      const { id, msg } = payload;
      const newConversations = state.chats.map(convo => {
        if(id === convo.conversationId) {
          return {
            ...convo,
            conversation: [msg, ...convo.conversation]
          };
        }
        return convo;
      });
      return {
        ...state,
        chats: newConversations
      };
    case USER_NOT_FOUND:
    case CLEAR_SEARCH:
        return {
          ...state, 
          search: {
            _id: null,
            name: '',
            email: '',
            date: ''
          }
        };
    default:
      return state;
  }
}