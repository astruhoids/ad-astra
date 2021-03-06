import React from 'react';
import { Container, Card, Row, Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckInCards from '../components/CheckInCards';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';
import Clearance from '../components/Clearance';
import { VaccineInformation } from '../../api/vaccineinformation/VaccineInformation';
import VaccineInfoCard from '../components/VaccineInfoCard';
import NoVaccination from '../components/NoVaccination';
import VerticalNavBar from '../components/VerticalNavBar';
import Loader from '../components/Loader';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {
  render() {
    // If the subscription(s) have been received, render the page, otherwise show a loading icon.
    return (this.props.ready) ? this.renderPage() : (
      <Container>
        <Loader text='Getting data'/>
      </Container>
    );
  }

  renderPage() {
    let dailychecks;
    if (this.props.ready) {
      dailychecks = this.props.health.sort((a, b) => (a.date.getDate() < b.date.getDate() ? 1 : -1)).slice(0, 4);
    }

    return (
      <Container fluid>
        <Container id="home-page">
          <Row className="justify-content-md-center">
            <VerticalNavBar classes="std-mt mr-4 pl-1 pr-1"/>
            <Col>
              {(this.props.ready) ? (<Clearance statuses={this.props.health}/>) : <></>}
              <h1 className="text-border" style={{ color: 'white' }}>On-campus check-in</h1>
              <Card border="dark" className="mb-5">
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
              {(this.props.ready && this.props.vaccine.length !== 0) ? (
                this.props.vaccine.map((vaccine) => <VaccineInfoCard key={vaccine._id} vaccine={vaccine}/>)
              ) : (
                <NoVaccination />
              )}
              <h1 style={{ color: 'white' }} className="mb-4 text-border">
                Check-in History
                <Link to='/history'>
                  <h6 className="text-border" style={{ color: 'white' }}>View All &gt;</h6>
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
  vaccine: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};
// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to HealthStatus documents.
  const subscription1 = Meteor.subscribe(HealthStatus.userPublicationName);
  const subscription2 = Meteor.subscribe(VaccineInformation.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  // Get the Health documents
  const health = HealthStatus.collection.find({}).fetch();
  const vaccine = VaccineInformation.collection.find({}).fetch();
  return {
    currentUser,
    health,
    vaccine,
    ready,
  };
})(Home);
