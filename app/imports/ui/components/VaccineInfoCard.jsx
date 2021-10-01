import React from 'react';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class VaccineInfoCard extends React.Component {
  formatDate = (date) => date.toLocaleDateString('en-US')

  singleDose = ['Johnson', 'AstraZeneca', 'CanSinoBio', 'ZhifeiLongcom'];

  render() {
    return (
      <div>
        <Card className="mb-5">
          <Card.Body className="p-4">
            <Card.Title className="mb-4" style={{ fontSize: '25px' }}>Vaccination Card Submission</Card.Title>
            <ListGroup className="list-group-flush" id="home-vaccine-card">
              <ListGroupItem>
                <Card.Subtitle className="text-muted">Vaccine Name</Card.Subtitle>
                <Card.Text>{this.props.vaccine.vaccine}</Card.Text>
              </ListGroupItem>
              <ListGroupItem>
                <Row xs={1} md={3}>
                  <Col>
                    <Card.Subtitle className="text-muted">1st Dose: Manufacturer Lot Number</Card.Subtitle>
                    <Card.Text>{this.props.vaccine.firstLot}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Subtitle className="text-muted">1st Dose: Date</Card.Subtitle>
                    <Card.Text>{this.formatDate(this.props.vaccine.firstDate)}</Card.Text>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Subtitle className="text-muted">
                  1st Dose: Healthcare Professional or Clinic Site
                </Card.Subtitle>
                <Card.Text>{this.props.vaccine.firstLocation}</Card.Text>
              </ListGroupItem>
              {this.singleDose.includes(this.props.vaccine.vaccine) ? '' : (
                <div>
                  <ListGroupItem>
                    <Row xs={1} md={3}>
                      <Col>
                        <Card.Subtitle className="text-muted">2nd Dose: Manufacturer Lot Number</Card.Subtitle>
                        <Card.Text>{this.props.vaccine.secondLot}</Card.Text>
                      </Col>
                      <Col>
                        <Card.Subtitle className="text-muted">2nd Dose: Date</Card.Subtitle>
                        <Card.Text>{this.formatDate(this.props.vaccine.secondDate)}</Card.Text>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Card.Subtitle className="text-muted">
                      2nd Dose: Healthcare Professional or Clinic Site
                    </Card.Subtitle>
                    <Card.Text>{this.props.vaccine.secondLocation}</Card.Text>
                  </ListGroupItem>
                </div>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

// Require a document to be passed to this component.
VaccineInfoCard.propTypes = {
  vaccine: PropTypes.shape({
    vaccine: PropTypes.string,
    firstDate: PropTypes.instanceOf(Date),
    firstLocation: PropTypes.string,
    firstLot: PropTypes.string,
    secondDate: PropTypes.instanceOf(Date),
    secondLocation: PropTypes.string,
    secondLot: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VaccineInfoCard);
