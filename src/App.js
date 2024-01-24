// Import AppNavbar
import AppNavbar from "./components/AppNavbar";
import Courses from "./pages/Courses";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { UserProvider } from "./UserContext";
import CourseView from "./pages/CourseView";

// Routing
// BrowserRouter component will enable us to simulate page navigation by synchronizing the shown content and the shown url in the web browser

// routes component holds all our Route components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import AddCourse from "./pages/AddCourse";

function App() {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null,
    });
    const unsetUser = () => {
        setUser({ id: null, isAdmin: null });
        localStorage.clear();
    };

    // useEffect(() => {
    //     console.log(user);
    //     console.log(localStorage);
    // }, [user]);

    useEffect(() => {
        fetch("http://localhost:3001/users/details", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((result) => result.json())
            .then((data) => {
                if (typeof data._id !== "undefined") {
                    setUser({
                        id: data._id,
                        isAdmin: data.isAdmin,
                    });
                } else {
                    setUser({
                        id: null,
                        isAdmin: null,
                    });
                }
            });
    }, []);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <AppNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/courseView/:courseId"
                        element={<CourseView />}
                    />
                    <Route path="/addCourse" element={<AddCourse />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
