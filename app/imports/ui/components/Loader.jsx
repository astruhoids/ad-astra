import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Loader extends React.Component {

  render() {
    return (
      <Row className="pt-4">
        <Col md={{ span: 4, offset: 4 }}>
          <Image className='spinning mx-auto d-block' src='/images/yellowpng.png' width='200' height='200'/>
          <p className='text-white text-center h2 text-border'>{this.props.text}</p>
        </Col>
      </Row>
    );
  }
}

Loader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loader;
