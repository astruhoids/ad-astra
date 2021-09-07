import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Dropdown, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faUser, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Navbar style={menuStyle} bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} activeClassName="" exact to="/">Ad Astra</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { this.props.currentUser ? (
              [<Nav.Link as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Nav.Link>,
              <Nav.Link as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link as={NavLink} activeClassName="active" exact to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="float-right">
            <NavDropdown title={this.props.currentUser === '' ? (<span>Login&nbsp;<FontAwesomeIcon icon={faUser}/></span>) : (<span>{this.props.currentUser}<FontAwesomeIcon icon="user"/></span>)} id="login-dropdown">
                {this.props.currentUser === '' ? (
                  <>
                    <NavDropdown.Item as={NavLink} exact to="/login"><FontAwesomeIcon icon={faUser} className="mr-2"/>&nbsp;Sign In</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} exact to="/signup"><FontAwesomeIcon icon={faUserPlus} className="mr-1"/>&nbsp;Sign Up</NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item as={NavLink} exact to="/signout"><FontAwesomeIcon icon={faUserMinus} className="mr-1"/>&nbsp;Sign Out</NavDropdown.Item>
                )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    // return (
    //   <Menu style={menuStyle} attached="top" borderless inverted>
    //     <Menu.Item as={NavLink} activeClassName="" exact to="/">
    //       <Header inverted as='h1'>meteor-application-template</Header>
    //     </Menu.Item>
    //     {this.props.currentUser ? (
    //       [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
    //         <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
    //     ) : ''}
    //     {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
    //       <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
    //     ) : ''}
    //     <Menu.Item position="right">
    //       {this.props.currentUser === '' ? (
    //         <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
    //           <Dropdown.Menu>
    //             <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
    //             <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       ) : (
    //         <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
    //           <Dropdown.Menu>
    //             <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
    //           </Dropdown.Menu>
    //         </Dropdown>
    //       )}
    //     </Menu.Item>
    //   </Menu>
    // );
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
