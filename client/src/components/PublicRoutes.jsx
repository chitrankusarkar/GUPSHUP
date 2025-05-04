import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, screenLoading } = useSelector(state => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (!screenLoading && isAuthenticated) {
            navigate('/');
        }
    }, [screenLoading, isAuthenticated]);

    return children;
};

export default PublicRoute;
