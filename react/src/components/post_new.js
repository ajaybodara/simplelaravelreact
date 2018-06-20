import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostNew extends Component {

    renderField = (field) => {
        const { meta: { touched, error } } = field
        const className = `form-group $touched &&.error} ? 'has-error':''`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {        
        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="container">
                <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Title for post"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        label="Tags"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        label="Post Content"
                        name="content"
                        component={this.renderField}
                    />
                    <button className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger" style={{ marginLeft: '5px' }}>Cancel</Link>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Enter a title!"
    }
    if (!values.tags) {
        errors.tags = "Enter some categories!"
    }
    if (!values.content) {
        errors.content = "Enter some content please!"
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostNew)
);