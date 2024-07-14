import React, { useState, useContext } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { CategoryContext } from '../contexts/CategoryContext'; // Import your category context

const BudgetForm = ({ tripId }) => {
    const categoryContext = useContext(CategoryContext); // Consume the CategoryContext

    const [budgetCategories, setBudgetCategories] = useState([
        { category: categoryContext.categories[0], estimatedBudgetForCategory: 0, realBudgetForCategory: 0 }
    ]);

    const handleAdd = async (e) => {
        e.preventDefault();

        const formData = {
            tripId,
            categories: budgetCategories.map(category => ({
                name: category.category.name,
                estimatedBudgetForCategory: category.estimatedBudgetForCategory,
                realBudgetForCategory: category.realBudgetForCategory
            }))
        };

        try {
            const docRef = await addDoc(collection(db, 'budget'), formData);
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Failed to create budget:', error);
            // Handle error state or feedback to user if submission fails
        }
    }

    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...budgetCategories];
        updatedCategories[index] = {
            ...updatedCategories[index],
            [field]: value
        };
        setBudgetCategories(updatedCategories);
    }

    const addCategory = () => {
        setBudgetCategories([...budgetCategories, { category: categoryContext.categories[0], estimatedBudgetForCategory: 0, realBudgetForCategory: 0 }]);
    }

    return (
        <div>
            <h1>BudgetForm</h1>
            <form className="form" id='budget-form' onSubmit={handleAdd}>
                <p>Travel ID: {tripId}</p>
                <h2>Categories</h2>
                {budgetCategories.map((category, index) => (
                    <div key={index}>
                        <label>
                            Category {index + 1}:
                            <select
                                value={category.category ? category.category.name : ''}
                                onChange={(e) => {
                                    const selectedCategory = categoryContext.categories.find(cat => cat.name === e.target.value);
                                    handleCategoryChange(index, 'category', selectedCategory);
                                }}
                            >
                                {categoryContext.categories.map((cat, idx) => (
                                    <option key={idx} value={cat.name}>{cat.icon} {cat.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Estimated Budget for {category.category ? category.category.name : ''}:
                            <input
                                type="number"
                                value={category.estimatedBudgetForCategory}
                                onChange={(e) => handleCategoryChange(index, 'estimatedBudgetForCategory', Number(e.target.value))}
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addCategory}>Add Category</button>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default BudgetForm;
