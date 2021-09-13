import React from 'react';
import { Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/** Renders a single row in the List Stuff table. See pages/History.jsx. */
class ImposterCard extends React.Component {
  formatDate = (date) => date.toLocaleDateString()

  render() {
    return (
      <Container>
        <Card className="mt-1">
          <Card.Body>
            <Card.Text>
              {this.formatDate(this.props.health.date)}&emsp;
              <Card.Link href='/'>
                <Link to={`/edit/${this.props.health._id}`} ><small className="text-muted">View Details &gt;</small></Link>
              </Card.Link>
            </Card.Text>
            <Card.Title>
              <FontAwesomeIcon icon={faTimes} className="mr-2" color='red'/>
                   Stay home or in your campus residence. DO NOT report to campus. DO NOT attend UH in-person events or activities.
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
ImposterCard.propTypes = {
  health: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ImposterCard);
