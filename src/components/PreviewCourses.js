import { Col, Card } from "react-bootstrap";
import {Link} from "react-router-dom"
export default function PreviewCourses({data}) {
    
    const {_id, name, description, price} = data;
    return (
        <Col className="col-2">
            {/*Adding the class cardHighlight for min-height*/}
            <Card className="cardHighlight">
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/CourseView/${_id}`}>{name}</Link>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">₱ {price}</h5>
                    <Link to={`/CourseView/${_id}`} className="btn btn-primary d-block">Details</Link>
                </Card.Footer>
            </Card>
        </Col>
    );
}
