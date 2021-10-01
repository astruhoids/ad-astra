import React from 'react';
import { Container, Card, Row, Button, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckInCards from '../components/CheckInCards';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';
import Clearance from '../components/Clearance';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    let dailychecks;
    if (this.props.ready) {
      dailychecks = this.props.health.sort((a, b) => (a.date.getDate() < b.date.getDate() ? 1 : -1)).slice(0, 4);
    }
    return (
      <Container fluid>
        <Container id="home-page">
          {(this.props.ready) ? (<Clearance statuses={this.props.health}/>) : <></>}
          <Row xs={1}>
            <Col>
              <h1 style={{ color: 'white' }}>On-campus check-in</h1>
              <Card className="mb-5">
                <Card.Body className="p-4">
                  <Card.Title style={{ fontSize: '25px' }}>Daily health check-in</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Help keep our campus safe by completing your daily health check-in!
                  </Card.Subtitle>
                  <Card.Text as="div" className="my-3">
                    <ol>
                      <li>Check your symptoms.</li>
                      <li>Keep track of your symptoms every day.</li>
                    </ol>
                  </Card.Text>
                  <Link to='/dailycheck'>
                    <Button variant="outline-info" size='lg'>
                      <FontAwesomeIcon icon={faHeart} className="mr-2"/>
                    Check Your Symptoms
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
              <Card className="mb-5">
                <Card.Body className="p-4">
                  <Card.Title className="mb-4" style={{ fontSize: '25px' }}>Vaccination Card Submission</Card.Title>
                  <ListGroup className="list-group-flush" id="home-vaccine-card">
                    <ListGroupItem>
                      <Card.Subtitle className="text-muted">Vaccine Name</Card.Subtitle>
                      <Card.Text>VACCINE NAME</Card.Text>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row xs={1} md={3}>
                        <Col>
                          <Card.Subtitle className="text-muted">1st Dose: Manufacturer Lot Number</Card.Subtitle>
                          <Card.Text>LOT NUMBER</Card.Text>
                        </Col>
                        <Col>
                          <Card.Subtitle className="text-muted">1st Dose: Date</Card.Subtitle>
                          <Card.Text>DATE</Card.Text>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Card.Subtitle className="text-muted">
                        1st Dose: Healthcare Professional or Clinic Site
                      </Card.Subtitle>
                      <Card.Text>LOCATION</Card.Text>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row xs={1} md={3}>
                        <Col>
                          <Card.Subtitle className="text-muted">2nd Dose: Manufacturer Lot Number</Card.Subtitle>
                          <Card.Text>LOT NUMBER</Card.Text>
                        </Col>
                        <Col>
                          <Card.Subtitle className="text-muted">2nd Dose: Date</Card.Subtitle>
                          <Card.Text>DATE</Card.Text>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Card.Subtitle className="text-muted">
                        2nd Dose: Healthcare Professional or Clinic Site
                      </Card.Subtitle>
                      <Card.Text>LOCATION</Card.Text>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
              <h1 style={{ color: 'white' }} className="mb-4">
                Check-in History&nbsp;
                <Link to='/history'>
                  <h6 style={{ color: 'white' }}>View All &gt;</h6>
                </Link>
              </h1>
              {(this.props.ready && dailychecks) ? (
                dailychecks.map((health) => <CheckInCards key={health._id} health={health}/>)) : <></>}
            </Col>
          </Row>
        </Container>
      </Container>

    );
  }
}

// Require an array of HealthStatus documents in the props.
Home.propTypes = {
  health: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to HealthStatus documents.
  const subscription = Meteor.subscribe(HealthStatus.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Health documents
  const health = HealthStatus.collection.find({}).fetch();
  return {
    health,
    ready,
  };
})(Home);
