import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedin, children }) => {
    if (!loggedin) { //Checks if a user is logged in
        return <Navigate to="/" replace />; //if not logged in automativcally redirects to the login page.
    }
    return children; // if logged in displays the protected route
    };
    export default ProtectedRoute