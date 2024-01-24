import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
export default function AdminView({ coursesData }) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(
        coursesData.map((course) => {
            return(
                <tr key={course._id}>
                    <td>{course._id}</td>
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>{course.price}</td>

                    <td>
                        {course.isActive === true ? (
                            <span className="text-success">Available</span>
                        ) : (
                            <span className="text-danger">Unavailable</span>
                        )}
                    </td>
                    <td>
                        <Button variant="primary">Edit</Button>
                    </td>
                    <td>
                        <Button variant="danger">Archive</Button>
                    </td>
                </tr>
            );
        }));
    }, [coursesData]);
   
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center mt-4 mb-4">Admin Dashboard</h1>
                    <Table striped bordered hover responsive>
                        <thead className="text-center">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{courses}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
