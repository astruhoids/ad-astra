import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Row, Col, Button, Container } from 'react-bootstrap';

class Clearance extends React.Component {
  constructor(props) {
    super(props);
    // Check if daily check was done
    let dailyCheckDone = false;
    const now = new Date();
    for (const ele of this.props.statuses) {
      if (now.getDate() === ele.date.getDate() && now.getMonth() === ele.date.getMonth() &&
        now.getFullYear() === ele.date.getFullYear()
        ) {
        dailyCheckDone = true;
        break;
      }
    }
    // if check was not done
    if (!dailyCheckDone) {
      this.state = { variant: 'warning'};
    } else {
      // get latest status
      let latest = this.props.statuses[0];
      console.log(this.props.statuses);
      for (const ele of this.props.statuses) {
        if (latest.date.getTime() < ele.date.getTime()) {
          latest = ele;
        }
      }
      this.state = { variant: latest.cleared ? 'success' : 'danger' };
    }
  }

  render() {
    let status = null;
    let msg = null;
    switch (this.state.variant) {
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
  statuses: PropTypes.array.isRequired
};

export default Clearance;
