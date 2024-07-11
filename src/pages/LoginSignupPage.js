// LoginSignupPage.js
import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignupForm';
import '../styles/LoginSignupPage.css';

const LoginSignup = ({ form }) => {
  return (
    <div className='full-content'>
      {form === "login" ?
        <LoginForm /> :
        <SignupForm />
      }
    </div>
  );
};

export default LoginSignup;
