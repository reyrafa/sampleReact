import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CourseView() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const { courseId } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
            .then((result) => result.json())
            .then((data) => {
                if (data) {
                    // console.log(data);
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                }
            });
    }, [courseId]);

    const enroll = (courseId) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                courseId: courseId,
            }),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.message === "Enrolled Successfully!") {
                    Swal.fire({
                        title: "Successfully Enrolled",
                        icon: "success",
                        text: "You have successfully enrolled into this course",
                    });
                }
                else{
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Please try again",
                    });
                }
            });
    };
    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <Card.Subtitle>Class Schedule</Card.Subtitle>
                            <Card.Text>8 am - 5 pm</Card.Text>
                            <Button
                                onClick={() => enroll(courseId)}
                                variant="primary"
                            >
                                Enroll
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
