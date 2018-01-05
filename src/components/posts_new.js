import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          // Dump out everything from field.input
          // aka onChange and onBlur etc..
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // Create the post, and navigate back
    // to our index page
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // We get this from redux-form
    const { handleSubmit } = this.props;

    return (
      <div>
        <h2>Add a new Post</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger" to="/">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

// Runs when user submits the form
function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Enter a title!";
  }

  if(!values.categories) {
    errors.categories = "Enter some categories!";
  }

  if(!values.content) {
    errors.content = "Enter some content!";
  }

  // If errors is empty, the form is fine
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
