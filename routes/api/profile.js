const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const prependHttp = require('prepend-http');

// Load Profile and User models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Load Input Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile works' }));

// @route  GET api/profile/all
// @desc   Get all profiles
// @access Public

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = `There is no profile for handle ${
          req.params.handle
        }`;
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = `There is no profile for handle ${
          req.params.user_id
        }`;
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route  GET api/profile
// @desc   Return current users profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/profile
// @desc   Create or edit users profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website)
      profileFields.website = prependHttp(req.body.website, {
        https: false
      });
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;

    // Skills - split into array
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(',');
    }

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Social - prepend http: / https: in case user doesn't enter
    profileFields.social = {};

    if (req.body.youtube)
      profileFields.social.youtube = prependHttp(req.body.youtube, {
        https: true
      });
    if (req.body.twitter)
      profileFields.social.twitter = prependHttp(req.body.twitter, {
        https: true
      });
    if (req.body.facebook)
      profileFields.social.facebook = prependHttp(req.body.facebook, {
        https: true
      });
    if (req.body.linkedin)
      profileFields.social.linkedin = prependHttp(req.body.linkedin, {
        https: true
      });
    if (req.body.instagram)
      profileFields.social.instagram = prependHttp(req.body.instagram, {
        https: true
      });

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
          // Check for handle (must be unique)
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = 'That handle is already taken';
              res.status(400).json(errors);
            }
          });
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/profile/experience
// @desc   Add experience to Profile
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add new experience to experience array

        profile.experience.unshift(newExp);

        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err =>
            res.status(400).json({ profile: 'Error saving experience' })
          );
      })
      .catch(err => res.status(404).json({ profile: 'No profile found' }));
  }
);

// @route  POST api/profile/education
// @desc   Add education to Profile
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add new experience to experience array

        profile.education.unshift(newEducation);

        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err =>
            res.status(400).json({ profile: 'Error saving education' })
          );
      })
      .catch(err => res.status(404).json({ profile: 'No profile found' }));
  }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete experience from Profile
// @access Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err =>
            res.status(400).json({ profile: 'Error removing experience' })
          );
      })
      .catch(err => res.status(404).json({ profile: 'No profile found' }));
  }
);

// @route  DELETE api/profile/education/:edu_id
// @desc   Delete education from Profile
// @access Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err =>
            res.status(400).json({ profile: 'Error removing education' })
          );
      })
      .catch(err => res.status(404).json({ profile: 'No profile found' }));
  }
);

// @route  DELETE api/profile
// @desc   Delete User and Profile
// @access Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: true }))
          .catch(err => res.status(400).json({ user: 'Error removing user' }));
      })
      .catch(err =>
        res.status(400).json({ profile: 'Error removing profile' })
      );
  }
);

module.exports = router;
