// import coursesData from "../data/coursesData.js";

import CourseCard from "../components/CourseCard.js";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext.js";
import UserView from "../components/UserView.js";
import AdminView from "../components/AdminView.js";
export default function Courses() {
    //Checks to see if the mock data was captured.
    // console.log(coursesData);
    // console.log(coursesData[0]);
    const [courses, SetCourses] = useState([]);

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user.isAdmin === true) {
            fetch(`${process.env.REACT_APP_API_URL}/courses/all`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((result) => result.json())
                .then((data) => {
                    // console.log(data);
                    SetCourses(
                        data
                        // data.map((course) => {
                        //     return (
                        //         <CourseCard courseProp={course} key={course._id} />
                        //     );
                        // })
                    );
                });
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/courses/`)
                .then((result) => result.json())
                .then((data) => {
                    // console.log(data);
                    SetCourses(
                        data
                        // data.map((course) => {
                        //     return (
                        //         <CourseCard courseProp={course} key={course._id} />
                        //     );
                        // })
                    );
                });
        }
    }, [user]);

    // const courses = coursesData.map((course) => {
    //     return <CourseCard courseProp={course} key={course.id} />;
    // });

    return user.isAdmin !== true ? (
        <>
            <UserView coursesData={courses} />
        </>
    ) : (
        <>
            <AdminView coursesData={courses} />
        </>
    );
}
