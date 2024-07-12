// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebaseConfig';
import './i18n';
import Header from './components/Header';
import Home from './pages/HomePage';
import Explore from './pages/ExplorePage';
import Account from './pages/AccountPage';
import LoginSignup from './pages/LoginSignupPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<LoginSignup form="login" />} />
        <Route path="/signup" element={<LoginSignup form="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
