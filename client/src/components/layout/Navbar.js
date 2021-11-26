import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ auth: {isAuthenticated} }) => {
  return (
    <nav>
      <h3>gamerSite</h3>
      <div className="links">
        <ul>
          { !isAuthenticated ?
          <>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/'>Login</Link>              
            </li>
          </>
          :
          <>
            <li>
                <Link to='/chat'>Chat</Link>
            </li>
            <li>
              <Link to='/create-profile'>create Profile</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          </>
          }
        </ul>
      </div>
    </nav>
  );
};

Navbar.prototype = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Navbar);