// tripModel.js
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const tripCollection = collection(db, 'trips');

export const createTrip = async (trip) => {
  try {
    const docRef = await addDoc(tripCollection, trip);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // Optionally return the ID of the newly created trip
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e; // Propagate the error back to the caller
  }
};
