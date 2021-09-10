import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stuffs } from '../../api/stuff/Stuff';
// import CheckInCards from '../components/CheckInCards';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class History extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <h3 className='text-center'>Getting Data</h3>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Row xs={1} md={1} className="g-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>Sep 8, 2021 at 7:36 AM</Card.Text>
                <Card.Title color='green'>
                  <FontAwesomeIcon icon={faCheck} className="mr-2" color='green'/>
                  You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
                </Card.Title>
                <hr />
                <Card.Link href='/'>
                  <small className="text-muted">View Details &gt;</small>
                </Card.Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Text>Sep 7, 2021 at 7:00 AM</Card.Text>
                <Card.Title>
                  <FontAwesomeIcon icon={faTimes} className="mr-2" color='red'/>
                  Stay home or in your campus residence. DO NOT report to campus. DO NOT attend UH in-person events or activities.
                </Card.Title>
                <hr />
                <Card.Link href='/'>
                  <small className="text-muted">View Details &gt;</small>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* {this.props.checkins.map((checkin, index) ==> <CheckInCards key=>{index} checkin={checkin}/)} */}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
History.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(History);
