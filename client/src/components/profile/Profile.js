import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import ProfileContent from './ProfileContent';

import { getProfile } from '../../actions/profile';
import ChatSocket from '../chat/ChatSocket';

const Profile = ({ getProfile, auth:{email} }) => {
  useEffect(() => {
    getProfile(email);
  }, [email, getProfile]);

  return (
    <Fragment>
      <UserInfo />
      <ProfileContent />
      <ChatSocket />
    </Fragment>
  );
};


Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  chats: PropTypes.array.isRequired,
  conversations: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
  conversations: state.profile.conversations,
  chats: state.chat.chats
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);