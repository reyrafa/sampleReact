import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
export default function AddCourse() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isActive, setIsActive] = useState(true);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (name !== "" && description !== "" && price !== "") {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [name, description, price]);

    const addCourse = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
            }),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data) {
                    console.log(data);
                    Swal.fire({
                        title: "Course Added",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Unsuccessful course creation",
                        icon: "error",
                    });
                }
            });

        setName("");
        setDescription("");
        setPrice("");
    };

    return user.isAdmin !== true ? (
        <Navigate to={"/courses"} />
    ) : (
        <Container>
            <Row>
                <h1 className="text-center">Add Course</h1>
                <Col className="col-4 mx-auto mb-3 bg-info ">
                    <Form
                        className="p-2"
                        onSubmit={(event) => {
                            addCourse(event);
                        }}
                    >
                        {/*Form Group for course Name*/}
                        <Form.Group className="mb-3" controlId="addCourseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                required
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Form.Group>

                        {/*FormGroup for description*/}
                        <Form.Group className="mb-3" controlId="addDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                required
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Form.Group>

                        {/*FormGroup for price*/}
                        <Form.Group className="mb-3" controlId="addPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                required
                                value={price}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                            />
                        </Form.Group>

                        <Button
                            disabled={isActive}
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
