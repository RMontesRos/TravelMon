// Explore.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Explore = () => {
  const { t } = useTranslation();
  return (
    <div className='full-content'>
      <h1>{t('explore')}</h1>
    </div>
  );
};

export default Explore;