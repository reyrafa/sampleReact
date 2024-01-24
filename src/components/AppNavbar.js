// Imports for the appnavbar
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

import { Link, NavLink } from "react-router-dom";

import UserContext from "../UserContext";
import { useContext } from "react";
import AddCourse from "../pages/AddCourse";

export default function AppNavbar() {
    // State to store the user information in the login
    // const [user, setUser] = useState(localStorage.getItem("token"));
    const { user } = useContext(UserContext);

    return (
        <Navbar expand="lg" className="bg-primary">
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-white" href="">
                    Zuitt Course-Booking
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className="text-white">
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/courses"
                            className="text-white"
                        >
                            Courses
                        </Nav.Link>
                        {/*Conditional rendering*/}
                        {user.id !== null ? (
                            <>
                                {user.isAdmin === true ?
                                <Nav.Link
                                    as={NavLink}
                                    to="/addCourse"
                                    className="text-white"
                                >Add Course</Nav.Link>: <></> }
                                <Nav.Link
                                    as={NavLink}
                                    to="/profile"
                                    className="text-white"
                                >
                                    Profile
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    to="/logout"
                                    className="text-white"
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    as={NavLink}
                                    to="/register"
                                    className="text-white"
                                >
                                    Register
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    to="/login"
                                    className="text-white"
                                >
                                    Login
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
