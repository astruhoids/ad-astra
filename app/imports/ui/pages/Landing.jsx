import React from 'react';
import { Container, Col, Row, Button, Image } from 'react-bootstrap';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Container id="bg-image" className="d-flex" fluid>
          <Container id='landing-page' className="text-center justify-content-center align-self-center">
            <Row>
              <Col>
                <Image style={{ width: '100px' }} roundedCircle src="/images/amongus-yellow-logo.jpg" />
                <h1>Ad Astra</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="landing-btns" variant="primary" size="lg">Login</Button>
                <Button className="landing-btns" variant="secondary" size="lg">New User?</Button>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Landing;
