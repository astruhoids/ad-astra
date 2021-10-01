import React from 'react';
import { Container, Form, Col, Figure, Row, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { VaccineInformation } from '../../api/vaccineinformation/VaccineInformation';

/** A simple static component to render some text for the landing page. */
class AddVaccine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doses: 2,
      loaded: false,
      require: true,
      vaccine: '',
      firstLot: '',
      firstDate: '',
      firstLocation: '',
      secondLot: '',
      secondDate: '',
      secondLocation: '',
      card: '',
    };
    this.handleDosages = this.handleDosages.bind(this);
    this.swapImage = this.swapImage.bind(this);
    this.submit = this.submit.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  // some function pass in obj, whatever insert
  // check
  // this.propsvaccinfo exist, if update, else insert

  submit(form) {
    console.log(form);
    form.preventDefault();

    console.log(this.state.doses);

    if (this.state.doses === 2) {
      VaccineInformation.collection.insert({
        user: this.props.currentUser,
        vaccine: this.state.vaccine,
        firstLot: this.state.firstLot,
        firstDate: this.state.firstDate,
        firstLocation: this.state.firstLocation,
        secondLot: this.state.secondLot,
        secondDate: this.state.secondDate,
        secondLocation: this.state.secondLocation,
        card: this.state.card,
      }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vaccine Information Saved', 'success');
        }
      });
    } else if (this.state.doses === 1) {
      VaccineInformation.collection.insert({
        user: this.props.currentUser,
        vaccine: this.state.vaccine,
        firstLot: this.state.firstLot,
        firstDate: this.state.firstDate,
        firstLocation: this.state.firstLocation,
        card: this.state.card,
      }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vaccine Information Saved', 'success');
        }
      });
    }
  }

  handleDosages(e) {
    if (e === 'Moderna' || e === 'Pfizer' || e === 'Sinopharm' || e === 'Sinovac'
      || e === 'Gamelya' || e === 'Vector' || e === 'IMBCAMS' || e === 'Novavax') {
      this.setState({ doses: 2, require: true });
    } else {
      this.setState({ doses: 1, require: false });
    }
  }

  swapImage(e) {
    const image = e.target.files;
    const reader = new global.FileReader();
    reader.onload = r => {
      this.setState({ imgSrc: r.target.result });
    };

    reader.readAsDataURL(image[0]);
  }

  updateForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loadVaccInfo() {
    if (!this.state.loaded && this.props.vaccInfo) {
      const {
        vaccine,
        firstLot,
        firstDate,
        firstLocation,
        secondLot,
        secondDate,
        secondLocation,
        // card,
      } = this.props.vaccInfo;
      this.setState({
        vaccine,
        firstLot,
        firstDate,
        firstLocation,
        secondLot,
        secondDate,
        secondLocation,
        // card,
        loaded: true,
      });
      this.handleDosages(this.state.vaccine);
    }

  }

  componentDidUpdate() {
    if (this.props.ready) {
      this.loadVaccInfo();
    }
  }

  render() {
    return (this.props.ready ? this.renderPage() : '');
  }

  renderPage() {
    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container id='daily-check' className="justify-content-left align-self-center">
            <h2>Vaccination Card</h2>
            <hr />
            <Form onSubmit={this.submit} onChange={this.updateForm}>
              <Form.Group>
                <Form.Label>Product Name/Manufacturer</Form.Label>
                <Form.Control
                  required
                  name = 'vaccine'
                  placeholder='Select'
                  as='select'
                  value={this.state.vaccine}
                  onChange={e => this.handleDosages(e.target.value)}>
                  <option value='Moderna'>Moderna</option>
                  <option value='Pfizer'>Pfizer</option>
                  <option value='Johnson'>Johnson &amp; Johnson</option>
                  <option value='AstraZeneca'>AstraZeneca - AZD1222</option>
                  <option value='Sinopharm'>Sinopharm BIBP-SARS-CoV-2</option>
                  <option value='Sinovac'>Sinovac - SARS-CoV-2</option>
                  <option value='Gamelya'>Gamelya Spuntnik V</option>
                  <option value='CanSinoBio'>CanSinoBio</option>
                  <option value='Vector'>Vector - EpiVacCorona</option>
                  <option value='ZhifeiLongcom'>Zhifei Longcom - Recombinant Novel</option>
                  <option value='IMBCAMS'>IMBCAMS - SARS-CoV-2</option>
                  <option value='Novavax'>Novavax</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <h6>First Dose</h6>
                <Form.Row>
                  <Col>
                    <Form.Label>LOT Number</Form.Label>
                    <Form.Control
                      name='firstLot'
                      value={this.state.firstLot}
                      required
                      type='text'
                      maxLength={7}
                      placeholder="1234567"
                    />
                  </Col>
                  <Col>
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control
                      name='firstDate'
                      value={this.state.firstDate ?
                        moment(this.state.firstDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
                      required
                      type='date'
                      min='2020-12-01'
                    />
                  </Col>
                  <Col>
                    <Form.Label>Healthcare Professional or Clinic Site</Form.Label>
                    <Form.Control
                      name='firstLocation'
                      value={this.state.firstLocation}
                      required
                      type='text'
                      maxLength={250}
                    />
                  </Col>
                </Form.Row>
              </Form.Group>
              {this.state.doses === 2 ?
                <Form.Group>
                  <h6>Second Dose</h6>
                  <Form.Row>
                    <Col>
                      <Form.Label>LOT Number</Form.Label>
                      <Form.Control name='secondLot' required={this.state.require}
                        type='text' maxLength={7} placeholder="1234567"></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Date Received</Form.Label>
                      <Form.Control
                        name='secondDate'
                        value={this.state.secondDate ?
                          moment(this.state.secondDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
                        required={this.state.require}
                        type='date'
                        min='2020-12-01'
                      />
                    </Col>
                    <Col>
                      <Form.Label>Healthcare Professional or Clinic Site</Form.Label>
                      <Form.Control
                        name='secondLocation'
                        value={this.state.secondLocation}
                        required={this.state.require}
                        type='text'
                        maxLength={250}
                      />
                    </Col>
                  </Form.Row>
                </Form.Group>
                :
                ''
              }
              <Form.Group controlId="formFile">
                <Form.Label>Vaccination Record Card</Form.Label>
                <Form.Control
                  name='card'
                  // value={this.state.card}
                  type='file'
                  accept='image/*'
                  onChange={e => this.swapImage(e)}
                />
              </Form.Group>
              <Row className='justify-content-center'>
                <Figure>
                  <Figure.Image
                    id='frameImage'
                    src={this.state.imgSrc ? this.state.imgSrc : null }
                    width={800}
                    height={500}
                    thumbnail
                  />
                </Figure>
              </Row>
              <Button type="submit">Submit form</Button>
            </Form>
          </Container>
        </Container>
      </div>
    );
  }
}

AddVaccine.propTypes = {
  ready: PropTypes.bool,
  vaccInfo: PropTypes.object,
  currentUser: PropTypes.string,
};

const VaccinationCollection = withTracker(() => {
  const subscription = Meteor.subscribe(VaccineInformation.userPublicationName);
  const ready = subscription.ready();
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  const vaccInfo = VaccineInformation.collection.findOne({ user: currentUser });
  return {
    ready,
    currentUser,
    vaccInfo,
  };
})(AddVaccine);

export default withRouter(VaccinationCollection);
