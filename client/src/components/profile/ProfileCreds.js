import React, { Component } from 'react';
import Moment from 'react-moment';

import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    // Map through experience array
    let expItems;

    if (!isEmpty(experience)) {
      expItems = experience.map(exp => (
        <li className="list-group-item" key={exp._id}>
          <h4>{exp.company}</h4>
          <p>
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
            {exp.to === null ? (
              ' Now'
            ) : (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong> {exp.title}
          </p>
          {/* The following are not required fields so may be empty*/}
          {!isEmpty(exp.location) ? (
            <p>
              <strong>Location:</strong> {exp.location}
            </p>
          ) : null}
          {!isEmpty(exp.description) ? (
            <p>
              <strong>Description:</strong> {exp.description}
            </p>
          ) : null}
        </li>
      ));
    } else {
      expItems = null;
    }

    // Map through education array
    let eduItems;

    if (!isEmpty(education)) {
      eduItems = education.map(edu => (
        <li className="list-group-item" key={edu._id}>
          <h4>{edu.school}</h4>
          <p>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree: </strong>
            {edu.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {edu.fieldofstudy}
          </p>
          {!isEmpty(edu.description) ? (
            <p>
              <strong>Description:</strong> {edu.description}
            </p>
          ) : null}
        </li>
      ));
    } else {
      eduItems = null;
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems !== null && expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems !== null && eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
