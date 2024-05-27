import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { lightTheme } from "../../Themes/LightTheme";

//agregar los iconos de ig,x,face,yt

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram color={lightTheme.palette.primary.main} />
            </a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter color={lightTheme.palette.primary.main} />
            </a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook color={lightTheme.palette.primary.main} />
            </a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube color={lightTheme.palette.primary.main} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
