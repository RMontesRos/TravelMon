// TripGrid.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TripGrid = ({ trips, year }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleTripClick = (trip) => {
        navigate('/trip', { state: { trip } });
    };

    const getDayAndMonthFromDate = (dateString) => {
        const monthNames = [
            'ene', 'feb', 'mar', 'abr', 'may', 'jun',
            'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
        ];
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const monthName = monthNames[month];
        return day + ' ' + monthName;
    };
    return (
        <div className="trip-grid">
            {trips.map(trip => {
                return trip.year === year && (
                    <div key={trip.id} className="trip-card" onClick={() => handleTripClick(trip)} >
                        <img className="trip-card-img" alt={trip.title} src={trip.photoURL}/>
                        <div className="trip-card-data">
                            <p className="title">{trip.title}</p>
                            {trip.knowsDates ? (
                                <p className="dates">{getDayAndMonthFromDate(trip.departureDate)} - {getDayAndMonthFromDate(trip.returnDate)}</p>
                            ) : <p className="dates">{t('dates-not-defined')}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TripGrid;
