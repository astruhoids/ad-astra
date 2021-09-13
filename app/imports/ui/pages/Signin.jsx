import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
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
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = (data, fRef) => {
    const { password, email } = data;
    
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  // Render the signin form.
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    let fRef = null;
    return (
      <Container id="bg-image" className="d-flex" fluid>
        <Container id="signin-page">
          <Row md className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Card>
                <Card.Header className="text-center">Account Login</Card.Header>
                <Card.Body>
                  <AutoForm ref={ref => {fRef = ref}} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                    <TextField type="email" name="email" placeholder="user@example.com"/>
                    <TextField type="password" name="password" placeholder="SuperSecretPassword"/>
                    <SubmitField inputClassName="btn btn-secondary pl-3 pr-3" value="Login"/>
                  </AutoForm>
                </Card.Body>
              </Card>
              <Alert variant="secondary" className="mt-3">
                <Link to="/signup">Click here to Register</Link>
              </Alert>
              {this.state.error === '' ? (
                ''
              ) : (
                <Alert variant="danger" className="">
                  Login failed - incorrect user or password
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
