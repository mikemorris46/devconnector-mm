import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name

    const firstName = profile.user.name.trim().split(' ')[0];

    // Get Skill set

    let skills;

    if (!isEmpty(profile.skills)) {
      skills = profile.skills.map((skill, index) => (
        <div className="p-3" key={index}>
          <FontAwesomeIcon icon={['fas', 'check']} /> {skill}
        </div>
      ));
    } else {
      skills = null;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio)
                ? `${firstName} does not have a bio`
                : profile.bio}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
