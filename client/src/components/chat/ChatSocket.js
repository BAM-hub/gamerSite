import { useEffect, Fragment, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { NEW_CHAT, SOCKET_CLOSE, SOCKET_CONNECTION, SOCKET_URL } from "../../actions/types";
import Chat from "./Chat";
import ChatOverview from "./ChatOverview";
import { newMessage, findChat, getUserAlerts } from "../../actions/chat";

const ChatSocket = ({ 
  user,
  socket,
  newMessage, 
  findChat,
  getUserAlerts,
  profile: { _id, email, conversations },
  chat: {selectedChat, chats} 
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [fetchedChats, setfetchedChats] = useState([]);

  useEffect(() => {
    if(chats.length === 0)
    getUserAlerts(_id, email, conversations);
  }, [_id, email, conversations, getUserAlerts, chats.length]);

  useEffect(() => {
    if(fetchedChats.includes(selectedChat._id)) return;
    findChat(selectedChat._id);
    setfetchedChats(prevState => [...prevState, selectedChat._id]);
  }, [fetchedChats, findChat, selectedChat._id]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    dispatch({
      type: SOCKET_CONNECTION,
      payload: socket
    });
    socket.emit('join', user);
    return () => {
      socket.off('join');
      socket.off('connection');
      dispatch({
        type: SOCKET_CLOSE,
        payload: io(SOCKET_URL)
      });
      socket.close();
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket?.on('recive_message', (msg) => {
      newMessage(msg.chatId,selectedChat._id , msg, chats);
    });
    return () => {
      socket?.off('recive_message');
    }
  });

  useEffect(() => {
    socket?.on('new-chat', data => { 
      dispatch({
        type: NEW_CHAT,
        payload: data
      });
      findChat(data.convoId)
    });
    return () => {
      socket?.off('new-chat');
    }
  });

  return (
    <Fragment>
      {location.pathname === '/profile' ? <ChatOverview /> : <Chat />}
    </Fragment>
  )
}

ChatSocket.propTypes = {
  user: PropTypes.string.isRequired,
  socket: PropTypes.object,
  newMessage: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  findChat: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getUserAlerts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  socket: state.auth.socket,
  chat: state.chat
});


export default connect(
  mapStateToProps,
  { newMessage, findChat, getUserAlerts }
  )(ChatSocket);