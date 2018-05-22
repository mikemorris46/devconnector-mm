const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // data.location = !isEmpty(data.location) ? data.location : '';
  // data.to = !isEmpty(data.to) ? data.to : '';
  // data.current = !isEmpty(data.current) ? data.current : '';
  // data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.title, { min: 2, max: 40 })) {
    errors.title = 'Job title must be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title is required';
  }

  if (!Validator.isLength(data.company, { min: 2, max: 40 })) {
    errors.company = 'Company name must be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company name is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
