import React, { useState } from 'react';
import { auth, storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next';
import { createTrip } from '../models/tripModel';

const TripForm = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [knowsDates, setKnowsDates] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  const [currency, setCurrency] = useState('EUR');
  const [travellers, setTravellers] = useState([]);
  const [newTravellerEmail, setNewTravellerEmail] = useState('');
  const [tripDays, setTripDays] = useState(0);

  const handleAddTrip = async (e) => {
    e.preventDefault();
    let photoURL = '';
    if (photo) {
      const storageRef = ref(storage, `trip_photos/${photo.name}`);
      try {
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error uploading photo:', error);
        // Handle photo upload error
      }
    }

    let calculatedTripDays = 0;
    if (!knowsDates) {
      calculatedTripDays = Number(tripDays);
    } else if (knowsDates && departureDate && returnDate) {
      const startDate = new Date(departureDate);
      const endDate = new Date(returnDate);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      calculatedTripDays = differenceInTime / (1000 * 3600 * 24) +1; // Convert milliseconds to days
    }

    const tripData = {
      title,
      description,
      knowsDates,
      departureDate: knowsDates ? departureDate : '',
      returnDate: knowsDates ? returnDate : '',
      tripDays: Math.ceil(calculatedTripDays), // Ensure days is a whole number
      estimatedBudget: Number(estimatedBudget),
      currency,
      emails: [...new Set([auth.currentUser.email, ...travellers])],
      photoURL,
      createdBy: auth.currentUser.uid,
    };

    try {
      await createTrip(tripData);
      console.log('Trip created successfully');
      clearForm();
    } catch (error) {
      console.error('Error creating trip:', error);
      // Handle error scenario if needed
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setKnowsDates(false);
    setDepartureDate('');
    setReturnDate('');
    setEstimatedBudget(0);
    setCurrency('EUR');
    setPhoto(null);
    setTravellers([]);
    setNewTravellerEmail('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleAddTraveller = () => {
    if (newTravellerEmail.trim() !== '') {
      setTravellers([...travellers, newTravellerEmail]);
      setNewTravellerEmail('');
    }
  };

  const handleRemoveTraveller = (emailToRemove) => {
    const updatedTravellers = travellers.filter(email => email !== emailToRemove);
    setTravellers(updatedTravellers);
  };

  return (
    <div>
      <h1>{t('trip-form')}</h1>
      <form id='trip-form' onSubmit={handleAddTrip}>
        <label>
          {t('title')}:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          {t('description')}:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>
        <label>
          {t('dates-known')}
          <input
            type="checkbox"
            checked={knowsDates}
            onChange={(e) => setKnowsDates(e.target.checked)}
          />
        </label>
        {knowsDates ? (
          <>
            <label>{t('departure-date')}</label>
            <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />

            <label>{t('return-date')}</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </>
        ) : (
          <label>
            {t('trip-days')}:
            <input
              type="number"
              value={tripDays}
              onChange={(e) => setTripDays(e.target.value)}
              required
            />
          </label>
        )}
        <br />
        <label>
          {t('travellers')}:
          <ul>
            {travellers.map((email, index) => (
              <li key={index}>
                {email}
                <button
                  type="button"
                  onClick={() => handleRemoveTraveller(email)}
                >
                  &#x2715; {/* Unicode character for cross mark */}
                </button>
              </li>
            ))}
          </ul>
          <input
            type="email"
            value={newTravellerEmail}
            onChange={(e) => setNewTravellerEmail(e.target.value)}
            placeholder={t('add-email')}
          />
          <button type="button" onClick={handleAddTraveller}>{t('add')}</button>
        </label>
        <br />
        <div className="budget-currency">
          <input
            type="number"
            placeholder={t('estimated-budget')}
            value={estimatedBudget}
            onChange={(e) => setEstimatedBudget(e.target.value)}
            required
          />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
            <option value="">{t('select-currency')}</option>
            <option value="USD">($) USD</option>
            <option value="EUR">(€) EUR</option>
            <option value="GBP">(£) GBP</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <br />
        <input
          type="file"
          onChange={handlePhotoChange}
          accept=".jpg,.jpeg,.png,.gif"
        />
        {photo && photo.type && !photo.type.startsWith('image') && (
          <p style={{ color: 'red' }}>{t('allowed-image-type')}</p>
        )}
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
}

export default TripForm;
