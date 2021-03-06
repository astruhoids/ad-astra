import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class CheckInCards extends React.Component {
  /** Format dates from YYYY-MM-DD to Day, Month DD, YYYY */
  dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

  formatDate = (date) => date.toLocaleDateString('en-US', this.dateOptions)

  render() {
    return (
      <div>
        <Card border="dark" className="mt-3">
          <Card.Body>
            <Card.Text>
              {this.formatDate(this.props.health.date)}&emsp;
            </Card.Text>
            {this.props.health.cleared ? (
              <Card.Title>
                <FontAwesomeIcon icon={faCheck} className="mr-2" color='green'/>
                You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
              </Card.Title>
            ) : (
              <Card.Title>
                <FontAwesomeIcon icon={faTimes} className="mr-2" color='red'/>
                Stay home or in your campus residence. DO NOT report to campus.
                DO NOT attend UH in-person events or activities.
              </Card.Title>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

// Require a document to be passed to this component.
CheckInCards.propTypes = {
  health: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    cleared: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CheckInCards);
