import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';
import CrewmateCard from '../components/CrewmateCard';
import ImposterCard from '../components/ImposterCard';
import Clearance from '../components/Clearance';

/** Renders a table containing all of the Stuff documents. Use <CheckInCards> to render each card. */
class History extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : '';
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="bg-image" className="d-flex" fluid>
        <Container id="history">
          <Row xs={1}>
            <Col>
              {this.props.health.map((health, index) => {
                switch (health.status) {
                case 'crewmate': return <Row><CrewmateCard key={index} health={health}/></Row>;
                case 'imposter': return <Row><ImposterCard key={index} health={health}/></Row>;
                default:
                  return '';
                }
              })}
            </Col>
          </Row>
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
