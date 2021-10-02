import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserInformation } from '../../api/userinformation/UserInformation';
import Loader from '../components/Loader';
import VerticalNavBar from '../components/VerticalNavBar';
class UserInformationPage extends React.Component {

  constructor() {
    super();
    this.yesVariant = 'warning';
    this.noVariant = 'outline-warning';
    this.state = {
      loaded: false,
      campus: '',
      housing: false,
      affiliation: false,
      online: false,
    };

    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();

    UserInformation.collection.update(this.props.userInfo._id, { $set: {
      user: this.props.currentUser,
      cleared: false,
      campus: this.state.campus,
      affiliation: this.state.affiliation,
      housing: this.state.housing,
      online: this.state.online,
    } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Saved User information', 'success');
      }
    });
  }

  loadUserInfo() {
    if (!this.state.loaded) {
      if (this.props.ready) {
        const { campus, housing, affiliation, online } = this.props.userInfo;
        this.setState({ campus, housing, affiliation, online, loaded: true });
      }
    }
  }

  componentDidUpdate() {
    if (this.props.ready) {
      this.loadUserInfo();
    }
  }

  render() {
    // If the subscription(s) have been received, render the page, otherwise show a loading icon.
    return (this.props.ready) ? this.renderPage() : (
      <Container>
        <Loader text='Getting data'/>
      </Container>
    );
  }

  renderPage() {
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
            <VerticalNavBar classes="pl-1 pr-1"/>
            <Col>
              <Card border="dark">
                <Card.Header className="h2">User Information</Card.Header>
                <Card.Body>
                  <Form onSubmit={this.submit}>
                    <Form.Group>
                      <Form.Check.Label htmlFor="campus">
                        <span className="h5">Please select your Campus or Organization affiliation.</span>
                        <br />
                        <span>You may edit your selection at any time in your user settings.</span>
                      </Form.Check.Label>
                      <Form.Control as="select" value={this.state.campus}
                        onChange={(e) => this.setState({ campus: e.target.value })}>
                        <option value="">Select a campus...</option>
                        {campuses.map((campus, index) => <option key={index} value={campus}>{campus}</option>)}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Check.Label htmlFor="affiliation">
                        <span className="h5">Are you a current UH/RCUH student or employee?</span>
                        <br />
                        <span>You will not receive any further email
                          notifications if you are no longer affiliated with UH</span>
                      </Form.Check.Label>
                      <Form.Check.Input name="affiliation" type="checkbox" hidden value={this.state.affiliation} />
                      <br />
                      <Button variant={this.state.affiliation ? this.yesVariant : this.noVariant}
                        block onClick={() => this.setState({ affiliation: true })}>Yes</Button>
                      <Button variant={this.state.affiliation ? this.noVariant : this.yesVariant}
                        block onClick={() => this.setState({ affiliation: false })}>No</Button>
                    </Form.Group>

                    <Form.Group>
                      <Form.Check.Label htmlFor="housing">
                        <span className="h5">Are you an On-Campus Housing Resident?</span>
                      </Form.Check.Label>
                      <Form.Check.Input name="housing" type="checkbox" hidden value={this.state.housing} />
                      <br />
                      <Button variant={this.state.housing ? this.yesVariant : this.noVariant}
                        block onClick={() => this.setState({ housing: true })}>Yes</Button>
                      <Button variant={this.state.housing ? this.noVariant : this.yesVariant}
                        block onClick={() => this.setState({ housing: false })}>No</Button>
                    </Form.Group>

                    <Form.Group>
                      <Form.Check.Label htmlFor="online">
                        <span className="h5">Are you studying / working online only?</span>
                      </Form.Check.Label>
                      <Form.Check.Input name="online" type="checkbox" hidden value={this.state.online} />
                      <br />
                      <Button variant={this.state.online ? this.yesVariant : this.noVariant}
                        block onClick={() => this.setState({ online: true })}>Yes</Button>
                      <Button variant={this.state.online ? this.noVariant : this.yesVariant}
                        block onClick={() => this.setState({ online: false })}>No</Button>
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
  userInfo: PropTypes.object,
  ready: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const UserInformationPageContainer = withTracker(() => {
  const subscription = Meteor.subscribe(UserInformation.userPublicationName);
  const ready = subscription.ready();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const userInfo = UserInformation.collection.findOne({ user: currentUser });
  return {
    ready,
    currentUser,
    userInfo,
  };
})(UserInformationPage);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(UserInformationPageContainer);
