import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import logo from '../assets/images/logo.png';
import GlobeIcon from '../assets/icons/globe.png';
import '../styles/Header.css';

const Header = ({ isLoggedIn }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const languageMenuRef = useRef();
  const profileMenuRef = useRef();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogoutClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/home');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const handleClickOutside = (event) => {
    if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
      setShowLanguageMenu(false);
    }
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  const handleClickProfile = () => {
    navigate('/account');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <Link to={isLoggedIn ? '/trips' : '/home'} className="logo-link">
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
            <div
              className="nav-link profile-menu-trigger"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
              onClick={handleClickProfile}
              ref={profileMenuRef}
            >
              {t('profile')}
              {showProfileMenu && (
                <div className="profile-menu">
                  <button className="nav-link btn-logout" onClick={handleLogoutClick}>{t('log-out')}</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="account-buttons">
            <button className="nav-link btn-blue" onClick={handleLoginClick}>{t('log-in')}</button>
            <button className="nav-link btn-gray" onClick={handleSignupClick}>{t('sign-up')}</button>
          </div>
        )}
        <div className="language-selector" ref={languageMenuRef}>
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

