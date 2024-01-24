import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Register() {
    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            mobileNo !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        ) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    function registerUser(event) {
        //to prevent reloading our website whenever we submit a form
        event.preventDefault();

        // console.log("Hello");

        // saving the inputs in our database using our backend application:
        // fetch() is JS method which allow us to pass/create a request to an API.

        fetch("http://localhost:3001/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                mobileNo: mobileNo,
            }),
        })
            .then((result) => result.json())
            .then((data) => {
                // console.log(data);
                if (data) {
                    alert("Thank you for registering!");

                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobileNo("");
                    setPassword("");
                    setConfirmPassword("");
                } else {
                    alert("Please try again!");
                }
            });
    }

    return user.id !== null ? (
        <Navigate to={"/courses"} />
    ) : (
        <Container>
            <Row>
                <h1 className="text-center">Register</h1>
                <Col className="col-4 mx-auto mb-3 bg-info ">
                    <Form
                        onSubmit={(event) => registerUser(event)}
                        className="p-2"
                    >
                        {/*Form Group for First Name*/}
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                required
                                value={firstName}
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                        </Form.Group>

                        {/*FormGroup for Last Name*/}
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                required
                                value={lastName}
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                        </Form.Group>

                        {/*Form Group for email*/}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
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
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        {/*FormGroup for Mobile Num*/}
                        <Form.Group className="mb-3" controlId="mobileNo">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Mobile Number"
                                required
                                value={mobileNo}
                                onChange={(event) => {
                                    setMobileNo(event.target.value);
                                }}
                            />
                        </Form.Group>

                        {/*FormGroup for password*/}
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword1"
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

                        {/*form group for confirmation of pw*/}
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword2"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your Password"
                                required
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value);
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
