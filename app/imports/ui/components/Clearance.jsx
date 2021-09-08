import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Clearance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cleared: false, status: 'IMPOSTER', variant: 'warning', hidden: 'true' };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.setState({ cleared: true, status: 'CREWMATE', variant: 'success' });
  }

  render() {
    return (
      <Alert style={{ marginBottom: '0px' }} variant={this.state.variant} hidden={this.state.hidden} dismissible>
        <Alert.Heading>Status - {this.state.status}:</Alert.Heading>
        {this.state.cleared ?
          <Container>
            <p>
              You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
            </p>
          </Container>
          :
          <Container>
            <p>
              You have not completed the safety requirements
            </p>
            <Button onClick={this.handleCheck}>Check your Symptoms</Button>
          </Container>
        }
      </Alert>
    );
  }
}

export default Clearance;
