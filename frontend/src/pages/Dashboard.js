import { useEffect, useState } from "react";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLow, setFilterLow] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const url = filterLow ? 'items/?low=true' : 'items/';
                const response = await api.get(url);
                setItems(response.data.results);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch inventory', err);
            }
        };
        fetchItems();
    }, [filterLow]);

    if (loading) return <p>Loading Inventory...</p>;

    return (
        <div className="dashboard">
            <h1>Inventory Management</h1>

            <div className="controls">
                <button onClick={() => setFilterLow(!filterLow)}>
                    {filterLow ? "Show All Items" : "Show Low Stock Only"}
                </button>
            </div>

            <button onClick={() => navigate('/add-item')} style={{ backgroundColor: 'blue', color: 'white' }}>
                + Add New Item
            </button>

            <table border="1" style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category || 'Uncategorized'}</td>
                            <td>{item.quantity}</td>
                            <td>
                                {item.is_low ?
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>LOW STOCK</span> :
                                    <span style={{ color: 'green' }}>In Stock</span>
                                }
                            </td>
                            <td>
                                <button>Edit</button>
                                <button style={{ color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;