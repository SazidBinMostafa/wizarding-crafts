import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Icon } from '@iconify/react';


function Login() {

    const { loginUser, googleSignIn, githubSignIn, forgotPassword } = useContext(AuthContext);
    const [ error, setError ] = useState(null);
    const previousLocation = useLocation().state || '/';

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)

    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

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


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        loginUser(email, password)
            .then(res => {
                if (res.user) {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    navigate(previousLocation)
                    setError(null)
                }
            })
            .catch(error => setError(error.message))
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                if (res.user) {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    navigate(previousLocation)
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
                    navigate(previousLocation)
                    setError(null)
                }
            })
            .catch(error => console.log(error))
    }

    const handleForgotPassword = (e) =>{
        e.preventDefault();


        if(!email){
            setError("Please enter your email address.")
            return;
        }

        setError(null)

        forgotPassword(email)
        .then(()=>{
            Toast.fire({
                icon: "success",
                title: "Password reset email sent successfully"
            });
        })
        .catch(error=> setError(error.message))

        
    }

    return <>
        <section className="card-body max-w-lg bg-gray-200 mx-auto rounded-3xl">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input onChange={handleEmailChange} name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input onChange={handlePasswordChange} name="password" type="password" placeholder="Your Password" className="input input-bordered" required/>
                    <div className="label">
                        <button type="button" onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</button>
                    </div>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="form-control my-6">
                    <button  type="submit" className="btn btn-neutral">Login</button>
                </div>
                <p>New here? <Link className="link text-blue-800" to='/sign-up'>Sign Up now!</Link></p>
            </form>
            <div className="divider">OR</div>
            <div className="flex flex-col gap-5">
                <button onClick={handleGoogleLogin} className="btn btn-block btn-outline text-xl font-bold"><Icon icon="devicon:google" /> Continue With Google</button>
                <button onClick={handleGithubLogin} className="btn btn-block btn-outline text-xl font-bold"><Icon icon="devicon:github" />Continue With Github</button>
            </div>
        </section>
    </>
}

export default Login;