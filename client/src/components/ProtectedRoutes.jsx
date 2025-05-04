import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, screenLoading } = useSelector((state) => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(isAuthenticated)
        if (!screenLoading && !isAuthenticated) navigate('/login')
    }, [screenLoading, isAuthenticated])

    return children
}

export default ProtectedRoute