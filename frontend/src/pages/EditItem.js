import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../api/axios';

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', quantity: 0, low_stock: 5 });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get(`items/${id}/`);
                setFormData(response.data);
            } catch (err) {
                setError("Can't load item data");
            }
        };
        fetchItems();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.quantity < 0) {
                setError('Stock cannot be negative');
                return;
            }
            await api.put(`items/${id}/`, formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Update failed');
        }
    };

    return (
        <div className="container">
            <h2>Edit Item</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Item Name: </label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <label>Quantity: </label>
                <input type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                <label>Category: </label>
                <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                <button type="submit">Update Stock</button>
                <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditItem;