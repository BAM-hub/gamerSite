import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserInfo from './UserInfo';
import ProfileContent from './ProfileContent';
import ChatOverview from './ChatOverview';

import { getProfile } from '../../actions/profile';

const Profile = ({ getProfile, email }) => {
  useEffect(()=>{
    getProfile(email);
  },[getProfile, email]);
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
  email: state.auth.email
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);