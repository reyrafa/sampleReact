import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from "../UserContext";

export default function Login() {
    // State hooks to store the values of the input fields

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [isActive, setIsActive] = useState(true);

    // allows us to consume the User context object and it;s properties to use  for user validation
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [email, password]);

    function loginUser(event) {
        event.preventDefault();
        fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.accessToken) {
                    // console.log(data.accessToken);
                    localStorage.setItem("token", data.accessToken);
                    retrieveUserDetails(data.accessToken);
                    Swal.fire({
                        title: "Successful login",
                        icon: "success",
                        text: "Welcome to Zuitt"

                    })
                    setEmail("");
                   
                    // alert("Thank you for logging in.");
                    // setUser({ token: data.accessToken });
                } else {
                    Swal.fire({
                        title: "Unsuccessful login",
                        icon: "error",
                        text: "unsuccessful login. Please check your credentials"
                    })
                    // alert("Unsuccessfull login");
                }
            });
            setPassword("");
     
    }

    const retrieveUserDetails = (token) => {
        fetch("http://localhost:3001/users/details", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => result.json())
            .then((data) => {
                // console.log(data);
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin,
                });
            });
    };

    return user.id !== null ? (
        <Navigate to={"/"} />
    ) : (
        <Container>
            <Row>
                <h1 className="text-center">Login</h1>
                <Col className="col-4 mx-auto mb-3 bg-info ">
                    <Form
                        onSubmit={(event) => loginUser(event)}
                        className="p-2"
                    >
                        {/*Form Group for email*/}
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail1"
                        >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Form.Group>

                        {/*FormGroup for password*/}
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword2"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
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
