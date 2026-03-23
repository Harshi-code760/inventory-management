import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        description: '',
        category: '',
        low_stock: 5
    });
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('categories/');
                setCategories(response.data.results || response.data);
            } catch (err) {
                console.error('Cannot load categories', err);
            }
        };
        fetchCategories();
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategoryName) return;

        try {
            const response = await api.post('categories/', { name: newCategoryName });
            setCategories([...categories, response.data]);
            setFormData(prev => ({ ...prev, category: response.data.id }));
            setNewCategoryName('');
            alert('Category created');
        } catch (err) {
            console.error('Error creating category', err.response?.data);
        }
    };

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
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    >
                        <option value="">-- Select a Category --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <div style={{ marginTop: '10px', padding: '10px', border: '1px dashed #ccc' }}>
                        <p style={{ fontSize: '0.8em', margin: '0 0 5px 0' }}>Don't see a category?</p>
                        <input
                            type="text"
                            placeholder="New category name..."
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            style={{ width: '60%', marginRight: '5px' }}
                        />
                        <button type="button" onClick={handleCreateCategory}>Add Category</button>
                    </div>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div>
                    <label>Initial Quantity:</label>
                    <input type="number"
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Item'}</button>
                <button type="button" onClick={() => navigate('/dashboard')} disabled={loading}>Cancel</button>
            </form>
        </div>
    );
};

export default AddItem;