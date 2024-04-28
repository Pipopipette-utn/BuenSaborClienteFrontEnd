import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//agregar los iconos de ig,x,face,yt

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;