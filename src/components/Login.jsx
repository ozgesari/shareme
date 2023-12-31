import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { stringify } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    debugger;
    let token = response.credential;
    const decoded = jwtDecode(token);

    const { name, picture, sub } = decoded;
    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    localStorage.setItem('user', JSON.stringify(user));

    client.createIfNotExists(user).then(() => {
      navigate('/', { replace: true });
    });
  };
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
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
