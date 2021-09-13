import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Row, Col, Button, Container } from 'react-bootstrap';

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
    let status = null;
    let msg = null;
    switch (this.props.variant) {
      case 'success':
        status = 'CREWMATE'
        msg = (<p>
          You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
        </p>);
        break;
      case 'warning':
        status = 'INCOMPLETE'
        msg = (<p>You have not completed today's safety check</p>);
        break;
      case 'danger':
        status = 'IMPOSTER'
        msg = (<p>You may <strong>not</strong> report to campus</p>);
        break;
    }
    return (
      <Row className="pt-3">
        <Col>
          <Alert variant={this.props.variant}>
            <Alert.Heading>Status - {status}</Alert.Heading>
            {msg}
          </Alert>
        </Col>
      </Row>
    );
  }
}

Clearance.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default Clearance;
