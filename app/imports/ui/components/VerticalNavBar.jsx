import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Nav, Tab, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faHome, faHeart, faShieldVirus, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

class VerticalNavBar extends React.Component {

  render() {
    return (
      <Tab.Container>
        <Col md={1} className={this.props.classes}>
          <Card border="dark" className="vertical-nav">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link as={NavLink} exact to="/home" className="text-center" eventKey="home">
                  <FontAwesomeIcon icon={faHome} className="fa-2x"/>
                  <br/>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} exact to="/dailycheck" className="text-center" eventKey="check">
                  <FontAwesomeIcon icon={faCheck} className="fa-2x"/>
                  <br/>
                  Daily Check
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} exact to="/history" className="text-center" eventKey="health">
                  <FontAwesomeIcon icon={faHeart} className="fa-2x"/>
                  <br/>
                  Health
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} exact to="/vaccine" className="text-center" eventKey="vaccine">
                  <FontAwesomeIcon icon={faShieldVirus} className="fa-2x"/>
                  <br/>
                  Vaccine
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} exact to="/userinfo" className="text-center" eventKey="info">
                  <FontAwesomeIcon icon={faUsersCog} className="fa-2x"/>
                  <br/>
                  User Info
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card>
        </Col>
      </Tab.Container>
    );
  }
}

VerticalNavBar.propTypes = {
  classes: PropTypes.string.isRequired,
};

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(VerticalNavBar);
