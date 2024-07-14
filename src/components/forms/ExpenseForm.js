import React, { useState, useContext } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { CategoryContext } from '../contexts/CategoryContext'; // Adjust path as per your actual structure

const ExpenseForm = ({ budgetId }) => {
    const [tripDay, setTripDay] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const { categories } = useContext(CategoryContext); // Access categories from context

    const handleAdd = async (e) => {
        e.preventDefault();
        
        // Create a new expense object
        const newExpense = {
            tripDay: tripDay || null, // optional field
            title,
            description,
            ticket: ticket || null, // optional field
            amount,
            category,
            budgetId // assuming budgetId is passed as a prop
        };
    
        try {
            // Add the expense to Firestore
            const docRef = await addDoc(collection(db, 'expenses'), newExpense);
            console.log("Expense added with ID: ", docRef.id);
    
            // Reset form fields after successful submission
            setTripDay('');
            setTitle('');
            setDescription('');
            setTicket('');
            setAmount(0);
            setCategory('');
        } catch (error) {
            console.error("Error adding expense: ", error);
        }
    };

    return (
        <div>
            <h1>ExpenseForm</h1>
            <form className="form" id='expense-form' onSubmit={handleAdd}>
                <label>
                    Trip Day (optional):
                    <input
                        type="text"
                        value={tripDay}
                        onChange={(e) => setTripDay(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                </label>
                <br />
                <label>
                    Ticket (optional):
                    <input
                        type="text"
                        value={ticket}
                        onChange={(e) => setTicket(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                    />
                </label>
                <br />
                <label>
                    Category:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category...</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ExpenseForm;
