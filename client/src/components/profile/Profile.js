import React, { Fragment } from 'react';
import UserInfo from './UserInfo';
import ProfileContent from './ProfileContent';
import ChatOverview from './ChatOverview';

const Profile = () => {
  return (
    <Fragment>
      <UserInfo />
      <ProfileContent />
      <ChatOverview />
    </Fragment>
  );
};

export default Profile;