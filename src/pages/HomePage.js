// Home.js
import React from 'react';
import SearchBar from '../components/SearchBar';
import Features from '../components/Features';
import CTA from '../components/CTA';
import '../styles/HomePage.css';

const Home = () => {
  return (
    <div className='full-content'>
      <SearchBar withImage={true} />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
