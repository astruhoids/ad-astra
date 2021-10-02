import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserMinus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.currentUser) === '' ? '' : this.renderNavBar();
  }

  renderNavBar() {
    const menuStyle = { margin: '10px 0' };
    return (
      <Navbar style={menuStyle} bg='dark' variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} activeClassName="" exact to={'/home'}>
          <img alt="" src="../images/yellowpng.png" width="35" height="35" className="d-inline-block align-top"/>{' '}
              Ad Astra
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link as={NavLink} activeClassName="active" exact to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="float-right">
            <NavDropdown
              alignRight
              title={(<span>{this.props.currentUser}&nbsp;<FontAwesomeIcon icon={faUser}/></span>)}
              id="login-dropdown">
              <NavDropdown.Item as={NavLink} exact to="/signout">
                <FontAwesomeIcon icon={faUserMinus} className="mr-1"/>
                  &nbsp;Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
