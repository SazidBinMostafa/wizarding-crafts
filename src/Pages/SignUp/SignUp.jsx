import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Icon } from '@iconify/react';


function SignUp() {

    const { createUser, updateName, updatePhotoURL, googleSignIn, githubSignIn } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(password);

    useEffect(() => {
        setConfirmPassword(password);
    }, [password]);

    

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate()

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;

        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regex.test(password)) {
            setError('Password must be at least 6 characters long and contain at least one uppercase letter and one lowercase letter.');
            return
        }


        createUser(email, confirmPassword)
            .then(res => {
                if (res.user) {
                    updateName(name)
                    updatePhotoURL(photoURL)
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    navigate('/')
                }
            })
            .catch(error => {
                if(error.message === "Firebase: Error (auth/email-already-in-use)."){
                    setError("Email already in use.")
                }
                else{
                    setError(error.message)
                }
                })
    }


    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                if (res.user) {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    navigate('/')
                    setError(null)
                }
            })
            .catch(error => console.log(error))
    }

    const handleGithubLogin = () => {
        githubSignIn()
            .then(res => {
                if (res.user) {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    navigate('/')
                    setError(null)
                }
            })
            .catch(error => console.log(error))
    }

    return <>
        <section className="card-body max-w-lg bg-gray-200 mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input name="photoURL" type="text" placeholder="Your photo URL" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input onChange={handlePasswordChange} name="password" type="password" placeholder="Your Password" className="input input-bordered" required />
                </div>
                <p className="text-red-500 mt-3">{error}</p>
                <div className="form-control my-6">
                    <button className="btn btn-neutral">Sign Up</button>
                </div>
                <p>Already have an account? <Link className="link text-blue-800" to='/login'>Login here!</Link></p>
            </form>
            <div className="divider">OR</div>
            <div className="flex flex-col gap-5">
                <button onClick={handleGoogleLogin} className="btn btn-block btn-outline text-xl font-bold"><Icon icon="devicon:google" /> Continue With Google</button>
                <button onClick={handleGithubLogin} className="btn btn-block btn-outline text-xl font-bold"><Icon icon="devicon:github" /> Continue With Github</button>
            </div>
        </section>
    </>
}

export default SignUp;