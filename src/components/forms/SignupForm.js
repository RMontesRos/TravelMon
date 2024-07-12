// SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { useTranslation } from 'react-i18next';
import UserModel, { registerUser } from '../models/userModel';

const SignupForm = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                ...UserModel,
                email: email,
                firstName: firstName,
                lastName: lastName,
                username: username
            };
            await registerUser(auth, email, password, userData);
            navigate('/trips');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError(t('email-already-in-use'));
            } else if (error.code === 'auth/weak-password') {
                setError(t('weak-password'));
            } else {
                setError(t('sign-up-error') + error.message);
            }
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <>
            <h1>{t('join-travelmon')}</h1>
            <p className="changeForm" onClick={handleLoginRedirect}>{t('want-log-in')}</p>
            <form id='register-form' onSubmit={handleRegister}>
                <div className="name-container">
                    <div className="name-field">
                        <label htmlFor="register-first-name">{t('first-name')}</label>
                        <input
                            type="text"
                            id="register-first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="name-field">
                        <label htmlFor="register-last-name">{t('last-name')}</label>
                        <input
                            type="text"
                            id="register-last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <label htmlFor="register-username">{t('username')}</label>
                <input
                    type="text"
                    id="register-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="register-email">{t('email')}</label>
                <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                <label htmlFor="register-password">{t('password')}</label>
                <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">{t('you-sign-up')}</button>
            </form>
        </>
    );
};

export default SignupForm;
