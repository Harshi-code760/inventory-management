import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    Box, Button, Card, CardContent, CircularProgress,
    Container, MenuItem, Select, TextField, Typography,
    Alert, FormControl, InputLabel, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
            <Container maxWidth="sm">
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
                    Back to Dashboard
                </Button>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>Add New Item</Typography>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField label="Item Name" required value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                sx={{ mb: 2 }} />

                            <FormControl fullWidth sx={{ mb: 1 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={formData.category}
                                    label="Category"
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <MenuItem value="">-- Select a Category --</MenuItem>
                                    {categories.map(cat => (
                                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                                <TextField
                                    label="New category name"
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                    size="small"
                                    sx={{ flex: 1 }}
                                />
                                <Button variant="outlined" onClick={handleCreateCategory} size="small">
                                    Add
                                </Button>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <TextField label="Description" multiline rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                sx={{ mb: 2 }} />

                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <TextField label="Initial Quantity" type="number"
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                    sx={{ flex: 1 }} />
                                <TextField label="Low Stock Threshold" type="number"
                                    value={formData.low_stock}
                                    onChange={e => setFormData({ ...formData, low_stock: e.target.value })}
                                    sx={{ flex: 1 }} />
                            </Box>

                            <Button type="submit" variant="contained" fullWidth
                                size="large" disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Item'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};
export default AddItem;