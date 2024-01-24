import { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import UserContext from "../UserContext.js";
import { useNavigate, Navigate } from "react-router-dom";

export default function Profile() {
    const { user } = useContext(UserContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((result) => result.json())
            .then((data) => {
                if (data) {
                    setDetails(data);
                }
            });
    }, []);
    return user.id === null ? (
        <Navigate to="/courses" />
    ) : (
        <Row>
            <Col className="p-5 bg-primary text-white">
                <h1 className="my-5 ">Profile</h1>
                <h2 className="mt-3">
                    {details.firstName} {details.lastName}
                </h2>
                <hr />
                <h4>Contacts</h4>
                <ul>
                    <li>Email: {details.email}</li>
                    <li>Mobile No: {details.mobileNo}</li>
                </ul>
            </Col>
        </Row>
    );
}
