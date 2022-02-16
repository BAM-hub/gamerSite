import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import UserInfo from './UserInfo';
import ProfileContent from './ProfileContent';
import ChatOverview from './ChatOverview';
import { io } from 'socket.io-client';
import { 
  SOCKET_CONNECTION,
  SOCKET_CLOSE
} from '../../actions/types';

import { getProfile } from '../../actions/profile';

const Profile = ({ getProfile, auth:{email} }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getProfile(email);
    const socket = io('localhost:5000');
    dispatch({
      type: SOCKET_CONNECTION,
      payload: socket
    });

    return () => {
      socket.off('connection');
      //socket.close();
      //socket.off();
      dispatch({
        type: SOCKET_CLOSE,
        payload: io('localhost:5000')
      });
      socket.close();
    }
  }, [getProfile, email, dispatch]);

  return (
    <Fragment>
      <UserInfo />
      <ProfileContent />
      <ChatOverview />
    </Fragment>
  );
};


Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);