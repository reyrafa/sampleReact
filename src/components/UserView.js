import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

export default function UserView({ coursesData }) {
    const [courses, setCourse] = useState([]);

    useEffect(() => {
        setCourse(
            coursesData.map((course) => {
                return <CourseCard courseProp={course} key={course._id} />;
            })
        );
    }, [coursesData]);

    return (
        <>
            <h1 className="text-center">Courses</h1>
            {courses}
        </>
    );
}
