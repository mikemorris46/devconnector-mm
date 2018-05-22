import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';

import { getProfileByHandle } from '../../actions/profileActions';

import Spinner from '../commons/Spinner';

class Profile extends Component {
  state = {};

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  // TODO: Try and replace this with getDerivedStateFromProps
  // componentWillReceiveProps(nextProps) {
  //   console.log('state', this.state.loading);
  //   if (nextProps.profile.profile === null && this.props.profile.loading) {
  //     this.props.history.push('/not-found');
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profile.loading !== prevState.loading) {
      if (
        nextProps.profile.profile === null &&
        nextProps.profile.profiles === null
      ) {
        return { notFound: true };
      } else {
        return { notFound: false };
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notFound) {
      prevProps.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else if (profile !== null && profile.noprofile != null) {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
            <h4>{profile.noprofile}</h4>;
          </div>
        </div>
      );
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  //getProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
