import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField, TextField } from 'uniforms-bootstrap4';
import { Container, Col, Row, Alert, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';

const bridge = new SimpleSchema2Bridge(new SimpleSchema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    uniforms: { type: 'password' }
  }
}));

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = (data, fRef) => {
    const { password, email } = data;

    // Check that inputted email is a valid email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.setState({ error: 'Invalid email format'});
    } else {
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.setState({ error: '', redirectToReferer: true });
        }
      });
    }
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={{ pathname: '/userinfo', state: { from } }}/>;
    }
    let fRef = null;
    return (
      <Container id="bg-image" className="d-flex" fluid>
        <Container id="signup-page">
          <Row md className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Card>
                <Card.Header className="text-center">Account Registration</Card.Header>
                <Card.Body>
                  <AutoForm ref={ref => {fRef = ref}} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                    <TextField type="email" name="email" placeholder="user@example.com"/>
                    <TextField type="password" name="password" placeholder="SuperSecretPassword"/>
                    <SubmitField inputClassName="btn btn-secondary pl-3 pr-3" value="Create Account"/>
                  </AutoForm>
                </Card.Body>
              </Card>
              <Alert variant="secondary" className="mt-3">
                Already have an account? Click <Link to="/login">here</Link> to signin.
              </Alert>
              {this.state.error === '' ? (
                ''
              ) : (
                <Alert variant="danger" className="">
                  Registration was not successful: { this.state.error }
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
