import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
// import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Container, Col, Row, Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

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

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    console.log(e);
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    const { email, password } = this.state;
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
    return (
      <Container id="bg-image" className="d-flex" fluid>
        <Container id="signin-page">
          <Row md className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Card>
                <Card.Header className="text-center">Account Login</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.submit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="no-right-radius">
                          <FontAwesomeIcon icon={faUser} />
                        </InputGroup.Text>
                        <Form.Control 
                          name="email"
                          type="email"
                          placeholder="E-mail address"    
                          onChange={this.handleChange}
                          />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="no-right-radius">
                          <FontAwesomeIcon icon={faLock} />
                        </InputGroup.Text>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Password"
                          onChange={this.handleChange}
                          />
                      </InputGroup>
                    </Form.Group>
                    <Button variant="secondary" type="submit" className="pl-3 pr-3">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Alert variant="secondary" className="mt-3">
                <Link to="/signup">Click here to Register</Link>
              </Alert>
              {this.state.error === '' ? (
                ''
              ) : (
                <Alert variant="danger" className="pl-0">
                  Login was not successful: { this.state.error }
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    );
      // <Container id="signin-page">
      //   <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
      //     <Grid.Column>
      //       <Header as="h2" textAlign="center">
      //         Login to your account
      //       </Header>
      //       <Form onSubmit={this.submit}>
      //         <Segment stacked>
      //           <Form.Input
      //             label="Email"
      //             id="signin-form-email"
      //             icon="user"
      //             iconPosition="left"
      //             name="email"
      //             type="email"
      //             placeholder="E-mail address"
      //             onChange={this.handleChange}
      //           />
      //           <Form.Input
      //             label="Password"
      //             id="signin-form-password"
      //             icon="lock"
      //             iconPosition="left"
      //             name="password"
      //             placeholder="Password"
      //             type="password"
      //             onChange={this.handleChange}
      //           />
      //           <Form.Button id="signin-form-submit" content="Submit"/>
      //         </Segment>
      //       </Form>
      //       <Message>
      //         <Link to="/signup">Click here to Register</Link>
      //       </Message>
      //       {this.state.error === '' ? (
      //         ''
      //       ) : (
      //         <Message
      //           error
      //           header="Login was not successful"
      //           content={this.state.error}
      //         />
      //       )}
      //     </Grid.Column>
      //   </Grid>
      // </Container>
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
