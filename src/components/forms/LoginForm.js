// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Éxito en el inicio de sesión
            navigate('/trips');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError(t('user-not-found'));
            } else if (error.code === 'auth/wrong-password') {
                setError(t('wrong-password'));
            } else if (error.code === 'auth/invalid-credential') {
                setError(t('invalid-credential'));
            } else {
                setError(t('log-in-error') + error.message);
            }
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <>
            <form className="form" id='login-form' onSubmit={handleLogin}>
                <h2>{t('log-in')}</h2>
                <label htmlFor="login-email">{t('email')}</label>
                <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                <label htmlFor="login-password">{t('password')}</label>
                <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">{t('log-in')}</button>
                <p className="changeForm" onClick={handleSignupRedirect}>{t('want-sign-up')}</p>
            </form>
        </>
    );
};

export default LoginForm;
