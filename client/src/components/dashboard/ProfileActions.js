import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <FontAwesomeIcon
          icon={['fas', 'user-circle']}
          className="text-info mr-1"
        />
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <FontAwesomeIcon
          icon={['fab', 'black-tie']}
          className="text-info mr-1"
        />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <FontAwesomeIcon
          icon={['fas', 'graduation-cap']}
          className="text-info mr-1"
        />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
