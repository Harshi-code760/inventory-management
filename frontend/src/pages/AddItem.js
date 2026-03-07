import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddItem = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        quantity: 0, 
        description: '', 
        low_stock: 5 
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('items/', formData);
            navigate('/dashboard'); 
        } catch (err) {
            const serverError = err.response?.data?.detail || "Error adding item";
            setError(serverError);
        }
    };

    return (
        <div className="add-item-container">
            <h2>Add New Inventory Item</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <input type="text" required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                    />
                </div>
                <div>
                    <label>Initial Quantity:</label>
                    <input type="number" 
                        value={formData.quantity}
                        onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    />
                </div>
                <button type="submit">Create Item</button>
                <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddItem;