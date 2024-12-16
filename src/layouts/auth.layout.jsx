import React, { useState } from 'react';
import { AuthInput, AuthWrapper } from './auth.styles';
import { IMAGES, ROUTE_PATHS, SERVER_ROUTES } from '../lib/settings';
import { axiosInstance } from '../lib/network';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router';

const AuthPageLayout = () => {
    const [type, setType] = useState('signup');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const navigate = useNavigate();

    const { authUser, loggedIn, logUserIn } = useAuthStore();

    const submitAuth = async () => {
        if (type === "signup") {
            // signup login
            let signupObject = {
                userName: name,
                email,
                phoneNo
            };

            if (!name.trim()) return toast.error("Full name cannot be empty");
            if (!email.trim()) return toast.error("Email cannot be empty");
            if (!phoneNo.trim()) return toast.error("Phone Number cannot be empty");

            try {
                const request = await axiosInstance.post(SERVER_ROUTES.SIGNUP, signupObject);
                // sign user into state

                logUserIn(request.data.data);

                localStorage.setItem("jwt", request.data.data.jwt);

                // navigate to messages board
                navigate(ROUTE_PATHS.CHAT);

            } catch (e) {
                toast.error("Error signing up. Please try again");
                console.log("Error signing up \n", e);
            }
        }
        if (type === "signin") {
            //signin logic
            if (!email.trim()) return toast.error("Email cannot be empty");

            try {
                const request = await axiosInstance.post(`${SERVER_ROUTES.SIGNIN}/${email}`);
                // sign user into state

                logUserIn(request.data.data);

                localStorage.setItem("jwt", request.data.data.jwt);

                // navigate to messages board
                navigate(ROUTE_PATHS.CHAT);

            } catch (e) {
                toast.error("Invalid Credentials. Please try again");
                console.log("Error signing in \n", e);
            }
        }
    };
    return (
        <AuthWrapper>
            <div className="float right mb-32">
                <img src={IMAGES.DottedImage} alt="" id="right_dots" />
            </div>
            <div className="float center mb-32">
                <img src={IMAGES.Logo} alt="" id="logo" />
            </div>
            {
                type === "signup" &&
                <>
                    <label htmlFor="name" className="hidden">Name</label>
                    <AuthInput type="text" name="name" value={name} className="input" placeholder="Name"
                        onChange={(e) => { setName(e.target.value); }}
                    />
                    <label htmlFor="email" className="hidden">Email</label>
                    <AuthInput type="email" name="email" value={email} className="input" placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                    <label htmlFor="phoneNo" className="hidden">Phone Number</label>
                    <AuthInput type="number" name="phoneNo" value={phoneNo} className="input"
                        placeholder="Phone Number"
                        onChange={(e) => { setPhoneNo(e.target.value); }}
                    />

                </>
            }
            {
                type === "signin" && <>

                    <label htmlFor="email" className="hidden">Email</label>
                    <AuthInput type="email" name="email" value={email} className="input" placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                </>
            }
            <button className="submit_btn" onClick={submitAuth}>
                {
                    type === "signup" ? "Sign Up" : "Sign In"
                }
            </button>
            {
                type === "signup" ?
                    <p className="switch_type_font" onClick={() => {
                        setType("signin");
                    }}>
                        Already have an account? Sign In
                    </p> :
                    <p className="switch_type_font" onClick={() => {
                        setType("signup");
                    }}>
                        Don't have an account? Sign Up
                    </p>
            }
            <div className="float left bottom">
                <img src={IMAGES.DottedImage} alt="" id="left_dots" />
            </div>
        </AuthWrapper>
    );
};

export default AuthPageLayout;
