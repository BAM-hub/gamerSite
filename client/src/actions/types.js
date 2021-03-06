export const LOGOUT = "LOGOUT";
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGGEDIN = "LOGGEDIN";
export const PROFILE_FOUND = "PROFILE_FOUND";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";
export const PROFILE_CREATED = "PROFILE_CREATED";
export const PROFILE_CREATE_ERROR = "PROFILE_CREATE_ERROR";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPLOAD_IMAGE_FAILED = "UPLOAD_IMAGE_FAILED";
export const IMAGE_DELETED = "IMAGE_DELETED";
export const IMAGE_DELETE_FAIL = "IMAGE_DELETE_FAIL";
export const GAME_LIST_UPDATED = "GAME_LIST_UPDATED";
export const SOCKET_CONNECTION = "SOCKET_CONNECTION";
export const SOCKET_CLOSE = "SOCKET_CLOSE";
export const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://gamersite.up.railway.app"
    : "http://localhost:5000";
export const IMAGE_PREFIX =
  process.env.NODE_ENV === "production"
    ? "https://gamersite.up.railway.app/api/images"
    : "http://localhost:5000/api/images";
export const USER_NOT_FOUND = "USER_NOT_FOUND";
export const USER_FOUND = "USER_FOUND";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const SET_SELECTED_CHAT = "SET_SELECTED_CHAT";
export const CONVERSATION_FOUND = "CONVERSATION_FOUND";
export const CONVERSATION_NOT_FOUND = "CONVERSATION_NOT_FOUND";
export const CONVERSAITION_CREATED = "CONVERSAITION_CREATED";
export const CONVERSATION_CREATE_FAIL = "CONVERSAION_CREATE_FAIL";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const NEW_CHAT = "NEW_CHAT";
export const CHAT_ALERTS_FOUND = "CHAT_ALERTS_FOUND";
export const CHAT_ALERTS_NOT_FOUND = "CHAT_ALERTS_NOT_FOUND";
export const CLEAR_CHAT_ALERTS = "CLEAR_CHAT_ALERTS";
