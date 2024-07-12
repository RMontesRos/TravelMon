import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

import TripGrid from '../components/TripGrid';
import '../styles/TripsPage.css';

const Trips = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [trips, setTrips] = useState([]);
  const [activeYear, setActiveYear] = useState('');

  const fetchYears = async () => {
    try {
      const q = query(collection(db, 'trips'), where('emails', 'array-contains', auth.currentUser.email));
      const querySnapshot = await getDocs(q);

      // Mapear sobre los documentos y obtener el campo estimatedBudget de cada uno
      const yearData = querySnapshot.docs.map(doc => doc.data().year);
      const tripsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrips(tripsData);

      // Obtener valores únicos de años y ordenar de mayor a menor
      let years = [...new Set(yearData)];
      years = years.sort((a, b) => b - a); // Ordena de mayor a menor

      // Si 'notset' existe, colócalo al principio
      if (years.includes('notset')) {
        years = ['notset', ...years.filter(year => year !== 'notset')];
        setActiveYear('notset');
      } else if (years.length > 0) {
        setActiveYear(years[0]); // Set the first year as active if 'notset' doesn't exist
      }

      setYears(years);

      console.log("Valores años únicos :", years); // Verificar los valores en la consola
    } catch (error) {
      console.error("Error al obtener datos de la colección 'trips': ", error);
    }
  };

  const handleAddNewTrip = () => {
    navigate('/new', {
      state: { tripId: '', budgetId: '', form: 'Trip' }
    });
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchYears();
    }
  }, []);

  return (
    <div className="full-content">
      <div className="header-trips">
        <p className="title">{t('your-trips')}</p>
        <button onClick={handleAddNewTrip}>{t('add-new')}</button>
      </div>
      {years.length > 0 ? (
        <>
          <nav className="nav-container">
            <div className="nav-bar">
              {years.map(year => (
                <button
                  key={year}
                  className={`nav-item ${activeYear === year ? 'active' : ''}`}
                  onClick={() => setActiveYear(year)}
                >
                  <p>{year === "notset" ? t('dates-not-defined') : year}</p>
                </button>
              ))}
            </div>
          </nav>
          <TripGrid trips={trips} year={activeYear} />
        </>
      ) : (
        <div className="no-trips">
          <h3>{t('no-trips-title')}</h3>
          <p>{t('no-trips-text')}</p>
        </div>
      )}
    </div>
  );
};

export default Trips;
