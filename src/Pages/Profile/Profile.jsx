import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";


function Profile() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    return <section className="h-[80vh] flex items-center justify-center">
        <div className="card card-side max-w-3xl bg-base-100 shadow-xl border">
            <figure>
                <img
                    src={user.photoURL}
                    alt="User's Photo URL" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user.displayName}</h2>
                <p className="my-3 font-semibold">{user.email}</p>
                <div className="card-actions justify-end">
                    <Link to='/settings' className="btn btn-outline btn-block">Edit</Link>
                </div>
            </div>
        </div>
    </section>
}

export default Profile;