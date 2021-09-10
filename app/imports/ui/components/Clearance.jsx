import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container } from 'react-bootstrap';

class Clearance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cleared: null, status: 'INCOMPLETE', variant: 'warning', hidden: false };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);

  }

  handleCheck() {
    // If they click no, no symptoms
    this.setState({ cleared: true, status: 'CREWMATE', variant: 'success' });
    // if they click yes, have symptoms
    this.setState({ cleared: false, status: 'IMPOSTER', variant: 'danger' });
  }

  handleDismiss() {
    if (this.state.hidden === true) {
      this.setState({ hidden: false });
    } else if (this.state.hidden === false) {
      this.setState({ hidden: true });
    }
  }

  render() {
    return (
      <div id="clearance" className="d-flex justify-content-center fluid">
        {this.state.hidden ?
          <Alert style={{ marginBottom: '0px' }} variant={this.state.variant} onClose={this.handleDismiss} dismissible>
            <Alert.Heading>Status - {this.state.status}:</Alert.Heading>
            <Container>
              {/* eslint-disable-next-line no-nested-ternary */}
              {(this.state.cleared === true) ?
                <Container>
                  <p>
                    You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
                  </p>
                </Container>
                : (this.state.cleared === null) ?
                  <Container>
                    <p>
                      You have not completed the safety requirements
                    </p>
                    <Button variant="Link" onClick={this.handleCheck}>
                      <Link to='/dailycheck'>
                        Check your Symptoms
                      </Link>
                    </Button>
                  </Container>
                  :
                  <Container>
                    <p>You may <strong>not</strong> report to campus.</p>
                  </Container>
              }
            </Container>
          </Alert>
          :
          <Button onClick={this.handleDismiss}>Show Alert</Button>
        }
      </div>
    );
  }
}

export default Clearance;
