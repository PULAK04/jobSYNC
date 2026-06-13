import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            // Redirect to login with return URL
            navigate("/login", { state: { from: location }, replace: true });
        } else if (user.role !== 'recruiter') {
            // Redirect to home if not recruiter
            navigate("/", { replace: true });
        }
    }, [user, navigate, location]);

    if (!user || user.role !== 'recruiter') {
        // Return null or loading spinner while redirecting
        return null;
    }

    return children;
};

export default ProtectedRoute;