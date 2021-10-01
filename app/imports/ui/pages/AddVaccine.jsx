import React from 'react';
import { Container, Form, Col, Figure, Row, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VaccineInformation } from '../../api/vaccineInformation/VaccineInformation';

/** A simple static component to render some text for the landing page. */
class AddVaccine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { doses: 2, imgSrc: '', opt: false };
    this.handleDosages = this.handleDosages.bind(this);
    this.swapImage = this.swapImage.bind(this);
  }

  submit(form) {
    form.preventDefault();
    console.log(form.target);
  }

  handleDosages(e) {
    if (e === 'Moderna' || e === 'Pfizer' || e === 'Sinopharm' || e === 'Sinovac'
      || e === 'Gamelya' || e === 'Vector' || e === 'IMBCAMS' || e === 'Novavax') {
      this.setState({ doses: 2, opt: false });
    } else {
      this.setState({ doses: 1, opt: true });
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

  render() {
    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container id='daily-check' className="justify-content-left align-self-center">
            <h2>Vaccination Card</h2>
            <hr />
            <Form onSubmit={(e) => this.submit(e)}>
              <Form.Group>
                <Form.Label>Product Name/Manufacturer</Form.Label>
                <Form.Control
                  required
                  placeholder='Select'
                  as='select'
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
                    <Form.Control required type='text' maxLength={7} placeholder="1234567"></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control required type='date' min='2020-12-01'></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Healthcare Professional or Clinic Site</Form.Label>
                    <Form.Control required type='text' maxLength={250}></Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
              {this.state.doses === 2 ?
                <Form.Group>
                  <h6>Second Dose</h6>
                  <Form.Row>
                    <Col>
                      <Form.Label>LOT Number</Form.Label>
                      <Form.Control required type='text' maxLength={7} placeholder="1234567"></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Date Received</Form.Label>
                      <Form.Control required type='date' min='2020-12-01'></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Healthcare Professional or Clinic Site</Form.Label>
                      <Form.Control required type='text' maxLength={250}></Form.Control>
                    </Col>
                  </Form.Row>
                </Form.Group>
                :
                ''
              }
              <Form.Group controlId="formFile">
                <Form.Label>Vaccination Record Card</Form.Label>
                <Form.Control required type='file' accept='image/*' onChange={e => this.swapImage(e)} />
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
