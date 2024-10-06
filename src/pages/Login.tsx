import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-hot-toast'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useLoginMutation } from '../redux/api/userApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../types/api-types';


const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const response = await login({
                name: user.displayName!,
                email: user.email!,
                gender,
                photo: user.photoURL!,
                role: "user",
                dob: date,
                _id: user.uid
            });

            if ('data' in response) {
                toast.success(response.data.message);
            } else {
                const error = response.error as FetchBaseQueryError;
                const errorMessage = (error.data as MessageResponse)?.message || "An error occurred";
                toast.error(errorMessage);
            }

        } catch (error) {
            toast.error("Sign In failed");
        }
    };


    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>
                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label>Date of birth</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <p>Already Signed In Once</p>
                    <button onClick={loginHandler} >
                        <FcGoogle /> <span>Sign in with Google</span>
                    </button>
                </div>

            </main>
        </div>
    )
}

export default Login