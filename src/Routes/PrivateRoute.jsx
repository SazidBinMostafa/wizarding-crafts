import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        <div className="flex justify-center items-center w-full h-full">
            <span className="loading loading-dots loading-lg border"></span>
        </div>
    }

    if (user) {
        return children;
    }
    else {
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }


}

export default PrivateRoute;