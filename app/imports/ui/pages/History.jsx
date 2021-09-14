import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';
import CheckInCards from '../components/CheckInCards';
import Clearance from '../components/Clearance';

/** Renders a table containing all of the Stuff documents. Use <CheckInCards> to render each card. */
class History extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : '';
  }

  // Render the page once subscriptions have been received.
  renderPage() {

    const dailychecks = this.props.health.sort((a, b) => (a.date.getDate() < b.date.getDate() ? 1 : -1));

    return (
      <Container className="d-flex" fluid>
        <Container id="history">
          <h1 style={{ color: 'white' }} className="mb-4">Check-in History</h1>
          {dailychecks.map((health) => <CheckInCards key={health._id} health={health}/>)}
        </Container>
      </Container>
    );
  }
}

// Require an array of HealthStatus documents in the props.
History.propTypes = {
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
})(History);
