// CategoryContext.js
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  // Function to add a category to Firestore
  const addCategory = async (newCategory) => {
    try {
      const docRef = await addDoc(collection(db, 'categories'), newCategory);
      setCategories([...categories, { id: docRef.id, ...newCategory }]);
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  // Function to edit a category in Firestore
  const editCategory = async (categoryId, newName, newIcon) => {
    try {
      await updateDoc(doc(db, 'categories', categoryId), {
        name: newName,
        icon: newIcon
      });
      const updatedCategories = categories.map((category) =>
        category.id === categoryId ? { ...category, name: newName, icon: newIcon } : category
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error updating category: ', error);
    }
  };

  // Function to delete a category from Firestore
  const deleteCategory = async (categoryId) => {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
      const updatedCategories = categories.filter((category) => category.id !== categoryId);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, editCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
