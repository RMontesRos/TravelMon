// FormsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import BudgetForm from '../components/forms/BudgetForm';
import ExpenseForm from '../components/forms/ExpenseForm';
// import ItineraryForm from '../components/forms/ItineraryForm';
import TripForm from '../components/forms/TripForm';
import '../styles/FormsPage.css';

const FormsPage = () => {
    const location = useLocation();
    const { tripId, budgetId, form } = location.state || {};

    const renderComponent = () => {
        switch (form) {
            case 'Trip':
                return <TripForm />;
            case 'Budget':
                return <BudgetForm tripId={tripId} />;
            case 'Expense':
                return <ExpenseForm budgetId={budgetId} />;
            /*case 'Itinerary':
                return <ItineraryForm tripId={tripId} />;*/
            default:
                return null;
        }
    };

    return (
        <div className='full-content forms'>
            {renderComponent()}
        </div>
    );
};

export default FormsPage;
