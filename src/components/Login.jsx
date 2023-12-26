import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo.png'
import { stringify } from "uuid";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const responseGoogle=(response)=>{
        let token = response.credential;
        let decoded= jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(response))

        const {name, picture, sub}= decoded;

        const doc={
            _id:googleId,
            _type:'user',
            userName:name,
            image:imageUrl
        }

    }
    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="h-full w-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" alt="logo" />
                    </div>
                    <div className="shadow-2xl">
                        <GoogleOAuthProvider
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                        >
                            <GoogleLogin onSuccess={responseGoogle}
                                onError={responseGoogle}
                            />
                        </GoogleOAuthProvider>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;