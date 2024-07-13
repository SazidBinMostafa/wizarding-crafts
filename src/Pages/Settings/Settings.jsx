import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";


function Settings() {
    const { user, loading, updateName, updatePhotoURL } = useContext(AuthContext);

    const [name, setName] = useState(user.displayName)
    const [photoURL, setPhotoURL] = useState(user.photoURL)

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedName = (e.target.name.value);
        const updatedPhotoURL = (e.target.photoURL.value);

        if (updatedName !== "" && updatedName !== name && updatedPhotoURL !== "" && updatedPhotoURL !== photoURL) {
            setName(updatedName)
            setPhotoURL(updatedPhotoURL)
        }

        console.log(name)
        console.log(photoURL)

        updateName(name)
        updatePhotoURL(photoURL)
        Swal.fire({
            title: 'Success!',
            text: 'Your profile has been updated',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    return <section className="h-[80vh] flex items-center justify-center">
        <div className="card card-side max-w-3xl bg-base-100 shadow-xl border">
            <figure>
                <img
                    src={photoURL}
                    alt="User's Photo URL" />
            </figure>
            <div>
                <form onSubmit={handleSubmit} className="card-body">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input name="name" defaultValue={name} type="text" placeholder="Enter Your Name" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Photo URL</span>
                        </div>
                        <input name="photoURL" defaultValue={photoURL} type="text" placeholder="Enter Photo URL" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <input className="btn btn-outline mt-3" type="submit" value="Update" />
                </form>
            </div>
        </div>
    </section>
}

export default Settings;