import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

/** Renders a single row in the List Stuff table. See pages/History.jsx. */
class CheckInCards extends React.Component {
  render() {
    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Text>{this.props.health.date}</Card.Text>
            {this.props.health.status === 'crewmate' ? (
              <Card.Title color='green'>
                <FontAwesomeIcon icon={faCheck} className="mr-2" color='green'/>
                  You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
              </Card.Title>
            ) : '' }
            {this.props.health.status === 'imposter' ? (
              <Card.Title>
                <FontAwesomeIcon icon={faTimes} className="mr-2" color='red'/>
                  Stay home or in your campus residence. DO NOT report to campus. DO NOT attend UH in-person events or activities.
              </Card.Title>
            ) : '' }
            <hr />
            <Card.Link href='/'>
              <Link to={`/edit/${this.props.health._id}`} ><small className="text-muted">View Details &gt;</small></Link>
            </Card.Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
CheckInCards.propTypes = {
  health: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    cleared: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CheckInCards);
