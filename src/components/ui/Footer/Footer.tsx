import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { lightTheme } from "../../Themes/LightTheme";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="social-icon">
            <a
              href="https://www.instagram.com/el__buen__sabor_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram color={lightTheme.palette.primary.main} />
            </a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a
              href="https://x.com/RestaurantBuen1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter color={lightTheme.palette.primary.main} />
            </a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a
              href="https://www.facebook.com/elbuensaborTEG?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook color={lightTheme.palette.primary.main} />
            </a>
          </Col>
          <Col xs="auto" className="social-icon">
            <a
              href="https://youtu.be/378EPtgKC_g?si=5tmGNmSfTYJuC-zI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube color={lightTheme.palette.primary.main} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;