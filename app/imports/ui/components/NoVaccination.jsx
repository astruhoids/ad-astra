import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class NoVaccination extends React.Component {
  render() {
    return (
      <div>
        <Card className="mb-5">
          <Card.Body className="p-4">
            <Card.Title className="mb-4" style={{ fontSize: '25px' }}>Vaccination Card Submission</Card.Title>
            <div style={{ textAlign: 'center' }}>
              <Card.Subtitle className="text-muted">
                In order to come to the campus, you need to submit your Vaccination Card.
              </Card.Subtitle>
              <Link to='/vaccine'>
                <Button variant="outline-info" size='lg' className="mt-3">
                  <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                  Add Vaccination Card
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default NoVaccination;
