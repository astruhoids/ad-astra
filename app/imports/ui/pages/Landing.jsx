import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Col, Row, Button, Image } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/home"/>;
    }

    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container id='landing-page' className="text-center justify-content-center align-self-center">
            <Row>
              <Col>
                <Image style={{ width: '100px' }} roundedCircle src="/images/amongus-yellow-logo.jpg" />
                <h1>Ad Astra</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to='/login'><Button className="landing-btns" variant="primary" size="lg">Login</Button></Link>
                <Link to='/signup'>
                  <Button className="landing-btns" variant="secondary" size="lg">New User?</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

export default LandingContainer;
