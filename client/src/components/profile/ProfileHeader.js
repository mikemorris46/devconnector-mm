import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    let socials, socialGroup;

    if (!isEmpty(profile.social)) {
      socials = Object.entries(profile.social);

      socialGroup = socials.map((social, index) => (
        <a
          key={index}
          className="text-white p-2"
          href={social[1]}
          target="_blank"
        >
          <FontAwesomeIcon icon={['fab', social[0]]} className="fa-2x" />
        </a>
      ));
    } else {
      socialGroup = null;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt="avatar"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={['fas', 'globe']}
                      className="fa-2x"
                    />
                  </a>
                )}
                {socialGroup}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
