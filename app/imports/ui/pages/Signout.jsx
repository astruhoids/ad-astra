import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Container id="bg-image" className="d-flex" fluid>
        <Container id="signout-page">
          <Row md className="mt-4">
            <Col md={{ span: 8, offset: 2 }}>
              <Redirect to="/login"/>
              <Alert variant="info" className="text-center">
                <h2>You have been signed out.</h2>
              </Alert>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
