// CTA.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function CTA({ withImage }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
      };
    
    
    return (
        <div className="cta">
            <div className="cta-text">
                <h3>{t('cta-title')}</h3>
                <p>{t('cta-text')}</p>
            </div>
            <button onClick={handleSignupClick}>{t('you-sign-up')}</button>
        </div>
    );
}

export default CTA;