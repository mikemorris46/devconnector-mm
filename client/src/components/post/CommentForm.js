import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextareaFieldGroup from '../commons/TextareaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);

    this.setState({ text: '' });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a Comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <TextareaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onInputChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
