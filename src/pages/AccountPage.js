// Account.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Account = () => {
  const { t } = useTranslation();
  return (
    <div className='full-content'>
      <h1>{t('profile')}</h1>
    </div>
  );
};

export default Account;