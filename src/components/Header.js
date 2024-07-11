import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo.png';
import GlobeIcon from '../assets/icons/globe.png';
import '../styles/Header.css';

const Header = ({ isLoggedIn }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false); // Close the language menu after selection
  };

  return (
    <header>
      <Link to={isLoggedIn ? '/trips' : '/'} className="logo-link">
        <div className="logo">
          <img src={logo} alt="logo-travelmon" />
          <div className="travelmon">
            <span className="travel"><span className="initial">T</span>ravel</span>
            <span className="mon"><span className="initial">M</span>on</span>
          </div>
        </div>
      </Link>

      <div className="nav-links">
        <Link to="/explore" className="nav-link">{t('explore')}</Link>
        {isLoggedIn ? (
          <>
            <Link to="/trips" className="nav-link">{t('trips')}</Link>
            <Link to="/profile" className="nav-link">{t('profile')}</Link>
          </>
        ) : (
          <div className="account-buttons">
            <button className="nav-link btn-blue" onClick={() => console.log('login clicked')}>{t('login')}</button>
            <button className="nav-link btn-gray" onClick={() => console.log('signup clicked')}>{t('signup')}</button>
          </div>
        )}
        <div className="language-selector">
          <img
            src={GlobeIcon}
            className="icon nav-icon"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            alt="language-selector"
          />
          {showLanguageMenu && (
            <div className="language-menu">
              <button
                className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                {t('english')}
              </button>
              <button
                className={`language-btn ${i18n.language === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
              >
                {t('spanish')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
