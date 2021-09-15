import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Alert variant="danger" className="text-center pt-4">
              <p>Page not found</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;
