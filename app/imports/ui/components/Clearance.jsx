import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';

class Clearance extends React.Component {
  constructor(props) {
    super(props);

    // Check if daily check was done
    const now = new Date();
    const dailyCheckDone = this.props.statuses.some((ele) => now.getDate() === ele.date.getDate() &&
      now.getMonth() === ele.date.getMonth() && now.getFullYear() === ele.date.getFullYear());

    // if check was not done
    if (!dailyCheckDone) {
      this.state = { variant: 'warning' };
    } else {
      // get latest status
      // sorts this.props.statuses by epoch
      this.props.statuses.sort((a, b) => a.date.getTime() - b.date.getTime());

      this.state = { variant: this.props.statuses.pop().cleared ? 'success' : 'danger' };
    }
  }

  render() {
    let status = null;
    let msg = null;
    switch (this.state.variant) {
    case 'success':
      status = 'CREWMATE';
      msg = (<p>
          You may report to campus / Anyone in Quarantine MUST continue to adhere to location restrictions
      </p>);
      break;
    case 'warning':
      status = 'INCOMPLETE';
      msg = (<p>You have not completed today&apos;s safety check</p>);
      break;
    case 'danger':
      status = 'IMPOSTER';
      msg = (<p>You may <strong>not</strong> report to campus</p>);
      break;
    default:
      status = 'INCOMPLETE';
      msg = (<p>You have not completed today&apos;s safety check</p>);
    }
    return (
      <Row className="mt-4">
        <Col>
          <Alert variant={this.state.variant}>
            <Alert.Heading>Status - {status}</Alert.Heading>
            {msg}
          </Alert>
        </Col>
      </Row>
    );
  }
}

Clearance.propTypes = {
  statuses: PropTypes.array.isRequired,
};

export default Clearance;
