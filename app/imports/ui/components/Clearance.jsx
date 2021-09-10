import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container } from 'react-bootstrap';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Clearance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cleared: false, status: 'IMPOSTER', variant: 'warning', hidden: false };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);

  }

  handleCheck() {
    this.setState({ cleared: true, status: 'CREWMATE', variant: 'success' });
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
      <div className="d-flex justify-content-center fluid" style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: 0, right: 0 }}>
        {this.state.hidden ?
          <Alert style={{ marginBottom: '0px' }} variant={this.state.variant} onClose={this.handleDismiss} dismissible>
            <Alert.Heading>Status - {this.state.status}:</Alert.Heading>
            <Container>
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
                  <Button variant="Link" onClick={this.handleCheck}>
                    <Link to={{ pathname: '/dailycheck' }}>
                      Check your Symptoms
                    </Link>
                  </Button>
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
