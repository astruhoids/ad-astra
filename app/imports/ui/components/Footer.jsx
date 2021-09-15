import React from 'react';
import { Container } from 'react-bootstrap';
/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <Container fluid style={divStyle} className="text-center text-white">
          <hr />
          AstrUHoids <br />
          University of Hawaii <br />
          Honolulu, HI 96822 <br />
        </Container>
      </footer>
    );
  }
}

export default Footer;
