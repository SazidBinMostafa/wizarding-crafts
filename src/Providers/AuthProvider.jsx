import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from '../../Firebase/firebase.config'


export const AuthContext = createContext(null)

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider;
    const githubProvider = new GithubAuthProvider;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            }
            else {
                setUser(null)
                setLoading(false)
            }
        })
        return () => unsubscribe();
    }, [])

    if(loading){
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const githubSignIn = () =>{
        return signInWithPopup(auth, githubProvider)
    }

    const forgotPassword = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    const updateName = (name) =>{

        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const updatePhotoURL = (photoURL) =>{
        return updateProfile(user, {
            photoURL: photoURL
        })
    }

    const logout = () => {
        setUser(null)
        return signOut(auth)
    }

    const authInfo = {
        user,
        createUser,
        loginUser,
        googleSignIn,
        githubSignIn,
        forgotPassword,
        updateName,
        updatePhotoURL,
        logout
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
}