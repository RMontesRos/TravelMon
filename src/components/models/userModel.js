import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Definición del modelo de datos
const UserModel = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    dob: ''  // opcional
};

// Colección de usuarios en Firestore
const userCollection = collection(db, 'users');

// Función para crear un usuario en Firebase Auth y Firestore
export const registerUser = async (auth, email, password, userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Document written with ID: ', user.uid);
        await setDoc(doc(db, 'users', user.uid), userData);
        return user;
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

// Función para obtener todos los usuarios
export const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(userCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error('Error getting documents: ', e);
        return [];
    }
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
    try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (e) {
        console.error('Error getting document: ', e);
        return null;
    }
};

// Función para actualizar un usuario
export const updateUser = async (id, user) => {
    try {
        const docRef = doc(db, 'users', id);
        await updateDoc(docRef, user);
        console.log('Document updated');
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};

export default UserModel;
