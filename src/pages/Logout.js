import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
export default function Logout() {
    // it clears or removes all the content of our localStorage
    // localStorage.clear();
    const { unsetUser } = useContext(UserContext);
    useEffect(() => {
        unsetUser();
    }, []);

    return <Navigate to="/login" />;
}
