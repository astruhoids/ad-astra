import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Clearance from '../components/Clearance';
import swal from 'sweetalert';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';

/** A simple static component to render some text for the landing page. */
class DailyCheckup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choice: null, redirectToReferer: false };
  }

  submit(isCleared) {
    HealthStatus.collection.insert({
      user: Meteor.user().username,
      cleared: isCleared
    });
    const msg = isCleared ? 'You may report to campus' : 'You are not cleared to visit campus'
    const icon = isCleared ? 'success' : 'error';
    swal('Health check recorded', msg, icon)
      .then((value) => {
        // reloads page when swal is closed
        window.location.reload(false);
      });
  }

  render() {
    // if user responds to daily checkin, redirect login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={{ pathname: '/' }}/>;
    }
    return (this.props.ready) ? this.renderPage() : '';
  }

  renderPage() {
    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container className="mb-3">
          <Clearance statuses={this.props.statuses}/>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className="font-weight-bold">Do any of the following apply to you?</Card.Title>
                  <Card.Text>
                    <p>
                      Have you tested positive for COVID-19 and are on home isolation?
                    </p>
                    <p>
                      Check for Symptoms of Illness:  If you have any symptoms of illness,
                      do not come to campus or the workplace.  Do you currently have any of
                      the following symptoms that are <strong> new, worsening, and not attributable to a pre-existing condition?</strong>
                    </p>
                    <ul>
                      <li>
                        Fever greater than 100.4 °F or feeling feverish (chills, sweating)
                      </li>
                      <li>
                        Cough
                      </li>
                      <li>
                        Shortness of breath/difficulty breathing
                      </li>
                      <li>
                        Sore throat
                      </li>
                      <li>
                        Unexplained muscle/body aches
                      </li>
                      <li>
                        Nausea/vomiting or diarrhea
                      </li>
                      <li>
                        Loss of senses of taste or smell
                      </li>
                      <li>
                        Runny or congested nose
                      </li>
                      <li>
                        Headache
                      </li>
                      <li>
                        Skin rash
                      </li>
                      <li>
                        Chest pain or pressure
                      </li>
                    </ul>
                    <p>
                      Check for Recent COVID-19 Exposure:
                    </p>
                    <ul>
                      <li>
                        Have you traveled out of the state and are currently under quarantine orders by the Department of Health or your medical care provider ?
                      </li>
                      <li>
                        Are you unvaccinated and have been in close contact (&lt;6 feet for &ge; 15 minutes, cumulatively, over a 24-hour period) with anyone who
                        has an active, diagnosed case of COVID-19?  Note: Healthcare students/personnel wearing appropriate PPE at ALL TIMES while caring for a patient with COVID-19 would NOT be considered a close contact (ref. DOH medical advisory #16)
                      </li>
                      <li>
                        Has the Department of Health told you that you have been in contact with a person with COVID-19 AND you are UNvaccinated?
                      </li>
                    </ul>
                  </Card.Text>
                  <Row>
                    <Col>
                        <Button 
                          variant='dark'
                          className='landing-btns'
                          onClick={e => this.submit(false)}>
                          Yes
                        </Button>
                    </Col>
                    <Col>
                        <Button 
                          variant='dark'
                          className='landing-btns'
                          onClick={e => this.submit(true)}>
                          No
                        </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center pt-2">
                    <p>New submissions will update your status</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>
        </Container>
      </div>
    );    
  }
}

DailyCheckup.propTypes = {
  ready: PropTypes.bool.isRequired,
  statuses: PropTypes.array.isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(HealthStatus.userPublicationName);
  const ready = subscription.ready();
  const statuses = HealthStatus.collection.find({}).fetch();
  return {
    ready,
    statuses
  };
})(DailyCheckup);

