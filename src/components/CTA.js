// CTA.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../assets/icons/search.png';

function CTA({ withImage }) {
    const { t } = useTranslation();

    const handleSignUp = () => {
        // Define sign up action here
        console.log("Sign up button clicked");
    };
    
    return (
        <div className="cta">
            <div className="cta-text">
                <h3>{t('cta-title')}</h3>
                <p>{t('cta-text')}</p>
            </div>
            <button onClick={handleSignUp}>{t('you-signup')}</button>
        </div>
    );
}

export default CTA;