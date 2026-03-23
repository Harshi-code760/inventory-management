import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../api/axios';

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', quantity: 0, low_stock: 5, description: '', category: ''
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemRes, catRes] = await Promise.all([
                    api.get(`items/${id}/`),
                    api.get('categories/')
                ]);
                setFormData(itemRes.data);
                setCategories(catRes.data.results || catRes.data);
            } catch (err) {
                setError("Can't load item data");
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.quantity < 0) {
            setError('Stock cannot be negative');
            return;
        }
        try {
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
                <div>
                    <label>Item Name: </label>
                    <input type="text" value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required />
                </div>
                <div>
                    <label>Category: </label>
                    <select
                        value={formData.category || ''}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    >
                        <option value="">-- Select a Category --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Description: </label>
                    <textarea value={formData.description || ''}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div>
                    <label>Quantity: </label>
                    <input type="number" value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    />
                </div>
                <div>
                    <label>Low Stock Threshold: </label>
                    <input type="number" value={formData.low_stock}
                        onChange={e => setFormData({ ...formData, low_stock: parseInt(e.target.value) })}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Item'}
                </button>
                <button type="button" onClick={() => navigate('/dashboard')}
                    style={{ marginLeft: '10px' }} disabled={loading}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditItem;