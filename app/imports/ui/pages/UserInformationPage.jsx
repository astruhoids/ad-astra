import React from "react";
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { UserInformation } from '../../api/userinformation/UserInformation';

class UserInformationPage extends React.Component {

  constructor() {
    super();
    this.yesVariant = "warning";
    this.noVariant = "outline-warning";
    this.state = { 
      campus: false,
      housing: false,
      affiliation: false,
      online: false,
    }

    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    UserInformation.collection.insert({ 
      user: this.props.currentUser, 
      cleared: false, 
      campus: this.state.campus,
      affiliation: this.state.affiliation,
      housing: this.state.housing,
      online: this.state.online,
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Saved User information', 'success');
      }
    })
  }
  
  render() {
    const campuses = [
      'UH Manoa', 
      'UH Hilo',
      'UH West Oahu',
      'Leeward Community College', 
      'Kapiolani Community College',
      'Hawaii Community College', 
      'Honolulu Community College',
      'Kauai Community College', 
      'Maui Community College',
      'Windward Community College',
      'UH System',
      'RCUH Core Staff (non-UH Project)',
      'East-West Center', 
    ];

    return (
      <Container id="bg-image" className="d-flex" fluid>
        <Container id="userinfo-page">
          <Row md>
            <Col md={{ span: 8, offset: 2 }}>
              <Card>
                <Card.Header className="text-center h2">User Information</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.submit}>
                    <Form.Group>
                      <Form.Check.Label htmlFor="campus"><span className="h5">Please select your Campus or Organization affiliation.</span> <br/> <span>You may edit your selection at any time in your user settings.</span></Form.Check.Label>
                      <Form.Control as="select" onChange={(e) => this.setState({ campus: e.target.value })}>
                        <option value="">Select a campus...</option>
                        { campuses.map((campus, index) => <option key={index} value={campus}>{ campus }</option>) }
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Check.Label htmlFor="affiliation"><span className="h5">Are you a current UH/RCUH student or employee?</span> <br/> <span>You will not receive any further email notifications if you are no longer affiliated with UH</span></Form.Check.Label>
                      <Form.Check.Input name="affiliation" type="checkbox" hidden value={this.state.affiliation}/>
                      <br/>
                      <Button variant={this.state.affiliation ? this.yesVariant : this.noVariant} block onClick={(e) => this.setState({ affiliation: true })}>Yes</Button>
                      <Button variant={this.state.affiliation ? this.noVariant : this.yesVariant} block onClick={(e) => this.setState({ affiliation: false })}>No</Button>
                    </Form.Group>

                    <Form.Group>
                      <Form.Check.Label htmlFor="housing"><span className="h5">Are you an On-Campus Housing Resident?</span></Form.Check.Label>
                      <Form.Check.Input name="housing" type="checkbox" hidden value={this.state.housing}/>
                      <br/>
                      <Button variant={this.state.housing ? this.yesVariant : this.noVariant} block onClick={(e) => this.setState({ housing: true })}>Yes</Button>
                      <Button variant={this.state.housing ? this.noVariant : this.yesVariant} block onClick={(e) => this.setState({ housing: false })}>No</Button>
                    </Form.Group>

                    <Form.Group>
                      <Form.Check.Label htmlFor="online"><span className="h5">Are you studying / working online only?</span></Form.Check.Label>
                      <Form.Check.Input name="online" type="checkbox" hidden value={this.state.online}/>
                      <br/>
                      <Button variant={this.state.online ? this.yesVariant : this.noVariant} block onClick={(e) => this.setState({ online: true })}>Yes</Button>
                      <Button variant={this.state.online ? this.noVariant : this.yesVariant} block onClick={(e) => this.setState({ online: false })}>No</Button>
                    </Form.Group>

                    <Button type="submit" className="mt-4" variant="success" block>Save</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
// Declare the types of all properties.
UserInformationPage.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const UserInformationPageContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(UserInformationPage);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(UserInformationPageContainer);