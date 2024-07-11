// Features.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import budget from '../assets/images/travel-budget.jpg';
import guides from '../assets/images/travel-guides.jpg';
import photos from '../assets/images/travel-photos.jpg';
import stories from '../assets/images/travel-stories.jpg';
import tips from '../assets/images/travel-tips.jpg';

function Features() {
    const { t } = useTranslation();
    
    const features = [
        { title: t('travel-guides'), description: t('travel-guides-text'), image: guides },
        { title: t('travel-budget'), description: t('travel.budget-text'), image: budget },
        { title: t('travel-photos'), description: t('travel-photos-text'), image: photos },
        { title: t('travel-stories'), description: t('travel-stories-text'), image: stories },
        { title: t('travel-tips'), description: t('travel-tips-text'), image: tips }
    ];

    const handleFeatureClick = (title) => {
        // Define action on feature click here
        console.log(`${title} clicked`);
    };

    return (
        <section className="features">
            <h2>{t('title-home')}</h2>
            <p>{t('description-home')}</p>
            <div className="features-list">
                {features.map((feature, index) => (
                    <div key={index} className="feature-item" onClick={() => handleFeatureClick(feature.title)}>
                    <img src={feature.image} className="feature-image" />
                        <p>{feature.title}</p>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;
