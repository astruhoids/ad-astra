import React from 'react';
import { Container, Col, Image, Row } from 'react-bootstrap';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container id='landing-page'>
        <Row>
          <Col xs={4}>
            <Image style={{ width: "200px", height: "auto" }} fluid roundedCircle src="/images/meteor-logo.png"/>
          </Col>
          <Col xs={8} className="text-center my-auto">
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;
