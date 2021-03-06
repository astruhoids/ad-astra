import React from 'react';
import { Container, Form, Col, Figure, Row, Button, Card, ProgressBar } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import moment from 'moment';
import AWS from 'aws-sdk';
import { VaccineInformation } from '../../api/vaccineinformation/VaccineInformation';
import VerticalNavBar from '../components/VerticalNavBar';
import Loader from '../components/Loader';

/** A simple static component to render some text for the landing page. */
class AddVaccine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doses: 2,
      loaded: false,
      imgFile: '',
      image: '',
      imageURL: '',
      require: true,
      vaccine: '',
      firstLot: '',
      firstDate: '',
      firstLocation: '',
      secondLot: '',
      secondDate: '',
      secondLocation: '',
      card: '',
      loading: 0,
    };
    this.handleDosages = this.handleDosages.bind(this);
    this.swapImage = this.swapImage.bind(this);
    this.submit = this.submit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.insertCollection = this.insertCollection.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
  }

  insertCollection() {
    VaccineInformation.collection.insert({
      user: this.props.currentUser,
      vaccine: this.state.vaccine,
      firstLot: this.state.firstLot,
      firstDate: this.state.firstDate,
      firstLocation: this.state.firstLocation,
      secondLot: this.state.secondLot,
      secondDate: this.state.secondDate,
      secondLocation: this.state.secondLocation,
      card: this.state.imageURL,
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Vaccine Information Saved', 'success');
      }
    });
  }

  updateCollection() {
    VaccineInformation.collection.update(this.props.vaccInfo._id, {
      $set: {
        user: this.props.currentUser,
        vaccine: this.state.vaccine,
        firstLot: this.state.firstLot,
        firstDate: this.state.firstDate,
        firstLocation: this.state.firstLocation,
        secondLot: this.state.secondLot,
        secondDate: this.state.secondDate,
        secondLocation: this.state.secondLocation,
        card: this.state.imageURL,
      },
    }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Vaccine Information Saved', 'success');
      }
    });
  }

  uploadFile = async (file) => {
    // Read content from the file
    // const fileContent = fs.readFileSync(file);
    // Set the region
    AWS.config.update({ region: 'us-west-1' });

    // Create S3 service object
    const s3 = new AWS.S3({
      accessKeyId: Meteor.settings.public.s3.accessKeyId,
      secretAccessKey: Meteor.settings.public.s3.secretAccessKey,
      apiVersion: '2006-03-01',
    });

    const type = file.name.split('.').pop();

    // Setting up S3 upload parameters
    const params = {
      Bucket: 'astruhoidsbucket',
      Key: `${this.props.currentUser}.${type}`, // File name you want to save as in S3
      Body: file,
    };
    // Uploading files to the bucket
    const upload = s3.upload(params, function (err) {
      if (err) {
        throw err;
      }
    });

    await upload.on('httpUploadProgress', (progress) => {
      this.setState({ loading: Math.round((progress.loaded / progress.total) * 100) });
    });

    return upload.promise();
  };

  async submit(form) {
    form.preventDefault();

    const mode = this.props.vaccInfo === undefined;
    await this.uploadFile(this.state.image).then((data) => this.setState({ imageURL: data.Location, loading: 0 }));

    if (mode) {
      this.insertCollection();
    } else {
      this.updateCollection();
    }

  }

  handleDosages(e) {
    if (e === 'Moderna' || e === 'Pfizer' || e === 'Sinopharm' || e === 'Sinovac'
      || e === 'Gamelya' || e === 'Vector' || e === 'IMBCAMS' || e === 'Novavax') {
      this.setState({ doses: 2, require: true });
    } else {
      this.setState({ doses: 1, require: false, secondLot: '', secondDate: '', secondLocation: '' });
    }
  }

  swapImage(e) {
    const image = e.target.files;
    const reader = new global.FileReader();
    reader.onload = r => {
      this.setState({ imgFile: r.target.result, image: image[0] });
    };

    reader.readAsDataURL(image[0]);
  }

  // Update state variable of modified field
  updateForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Load user's vaccine information if they have
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
        card,
      } = this.props.vaccInfo;
      this.setState({
        vaccine,
        firstLot,
        firstDate,
        firstLocation,
        secondLot,
        secondDate,
        secondLocation,
        imageURL: card,
        loaded: true,
      });

      this.handleDosages(vaccine);
    }
  }

  componentDidUpdate() {
    if (this.props.ready) {
      this.loadVaccInfo();
    }
  }

  render() {
    return (this.props.ready) ? this.renderPage() : (
      <Container>
        <Loader text='Getting data'/>
      </Container>
    );
  }

  renderPage() {
    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container className="justify-content-left align-self-center">
            <Row>
              <VerticalNavBar classes="std-mt mr-4 pl-1 pr-1"/>
              <Col md>
                <Card border="dark" className="std-mt">
                  <Card.Header>
                    <Card.Text as="h2" className="mt-2 mb-2 ml-3">Vaccination Card</Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={this.submit} onChange={this.updateForm} className="mr-3 ml-3">
                      <Form.Group>
                        <Form.Label>Product Name/Manufacturer</Form.Label>
                        <Form.Control
                          required
                          name='vaccine'
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
                              maxLength={8}
                              placeholder="5W6X7Y8Z"
                            />
                          </Col>
                          <Col>
                            <Form.Label>Date Received</Form.Label>
                            <Form.Control
                              name='firstDate'
                              value={this.state.firstDate ?
                                moment(this.state.firstDate).format('YYYY-MM-DD') : ''}
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
                              <Form.Control
                                name='secondLot'
                                value={this.state.secondLot}
                                required={this.state.require}
                                type='text'
                                maxLength={8}
                                placeholder="1A2B3CD4"
                              />
                            </Col>
                            <Col>
                              <Form.Label>Date Received</Form.Label>
                              <Form.Control
                                name='secondDate'
                                value={this.state.secondDate ?
                                  moment(this.state.secondDate).format('YYYY-MM-DD') : ''}
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
                          type='file'
                          accept='image/*'
                          onChange={e => this.swapImage(e)}
                        />
                      </Form.Group>
                      <Row className='justify-content-center'>
                        <Figure>
                          <Figure.Image
                            id='frameImage'
                            // eslint-disable-next-line no-nested-ternary
                            src={this.state.imgFile ? this.state.imgFile : this.state.imageURL ?
                              this.state.imageURL : null }
                            width={800}
                            height={500}
                            thumbnail
                          />
                          {this.state.loading ?
                            <Figure.Caption>
                              <ProgressBar animated now={this.state.loading} />
                            </Figure.Caption>
                            : <></>}
                        </Figure>
                      </Row>
                      <Button type="submit">Submit form</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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

export default withTracker(() => {
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
