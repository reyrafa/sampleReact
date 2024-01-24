// CRC Rule
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import Button from 'react-bootstrap/Button';

import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Banner({ data }) {
    // console.log(data);
    const { title, content, destination, label } = data;

    return (
        <Container>
            <Row>
                <Col className="p-5 text-center">
                    <h1>{title}</h1>
                    <p>{content}</p>
                    <Link className="btn btn-primary" to={destination}>
                        {label}
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}
