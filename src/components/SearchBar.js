// SearchBar.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../assets/icons/search.png';

function SearchBar({ withImage }) {
    const { t } = useTranslation();

    const handleSearch = () => {
        // Define search action here
        console.log("Search button clicked");
    };

    return (
        <div className="searchbar">
            {withImage &&
                <>
                    <h1>{t('serach-title')}</h1>
                    <p>{t('search-text')}</p>
                </>
            }
            <div className="search-container">
                <img src={SearchIcon} alt='' className="search-icon" />
                <input className="search-input" type="text" placeholder={t('search')} />
                <button className="search-button" onClick={handleSearch}>{t('search')}</button>
            </div>
        </div>
    );
}

export default SearchBar;
