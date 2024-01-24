import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CourseCard({ courseProp }) {
    // console.log(courseProp);
    const { _id, name, description, price } = courseProp;
    // Use the state hook for this component to be able to store its state
    // States are used to keep track of information related to an individual components
    // Syntax: const [getter, setter] = useState(initialValue)

    const [count, setCount] = useState(0);
    const [seat, setSeat] = useState(30);
    const [isActive, setIsActive] = useState(false);
    function enroll() {
        if (seat === 0) {
            alert("no more seats");
            setIsActive(true);
        } else {
            setCount(count + 1);
            setSeat(seat - 1);
            console.log("Enrolled");
        }
    }
    return (
        <Card className="m-5" id="courseComponent1">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price</Card.Subtitle>
                <Card.Text>PHP {price}</Card.Text>
                <Card.Text>Enrollees: {count}</Card.Text>
                <Button as={Link} to={`/courseView/${_id}`} variant="primary">
                    Details
                </Button>
            </Card.Body>
        </Card>
    );
}
