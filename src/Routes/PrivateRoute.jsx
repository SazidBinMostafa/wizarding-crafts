import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";


function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        <div className="flex justify-center items-center w-full h-full">
            <span className="loading loading-dots loading-lg border"></span>
        </div>
    }

    if (user) {
        return children;
    }
    else {
        return <Navigate to='/login'></Navigate>
    }


}

export default PrivateRoute;