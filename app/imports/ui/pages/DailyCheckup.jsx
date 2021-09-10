import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

/** A simple static component to render some text for the landing page. */
class DailyCheckup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choice: null, redirectToReferer: false };
  }

  submit(e) {
    const option = e === 'true';
    this.setState({ choice: option, redirectToReferer: true });
  }

  render() {
    // if user responds to daily checkin, redirect login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={{ pathname: '/' }}/>;
    }

    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container id="daily-check">
            <Row>
              <h1>Do any of the following apply to you?</h1>
            </Row>
            <Row>
              <Container>
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
              </Container>
            </Row>
            <Row>
              <Col>
                <Button variant='dark' className='landing-btns' value={true} onClick={e => this.submit(e.target.value)}>Yes</Button>
              </Col>
              <Col>
                <Button variant='dark' className='landing-btns' value={false} onClick={e => this.submit(e.target.value)}>No</Button>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default DailyCheckup;
