// Home.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar';
import Features from '../components/Features';
import '../styles/HomePage.css';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className='full-content'>
      <SearchBar withImage={true} />
      <Features />
    </div>
  );
};

export default Home;
