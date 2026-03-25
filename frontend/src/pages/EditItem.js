import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../api/axios';
import {
    Box, Button, Card, CardContent, CircularProgress,
    Container, MenuItem, Select, TextField, Typography,
    Alert, FormControl, InputLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
            <Container maxWidth="sm">
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
                    Back to Dashboard
                </Button>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ mb: 3 }}>Edit Item</Typography>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField label="Item Name" required value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                sx={{ mb: 2 }} />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={formData.category || ''}
                                    label="Category"
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <MenuItem value="">-- Select a Category --</MenuItem>
                                    {categories.map(cat => (
                                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField label="Description" multiline rows={3}
                                value={formData.description || ''}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                sx={{ mb: 2 }} />

                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <TextField label="Quantity" type="number"
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                                    sx={{ flex: 1 }} />
                                <TextField label="Low Stock Threshold" type="number"
                                    value={formData.low_stock}
                                    onChange={e => setFormData({ ...formData, low_stock: parseInt(e.target.value) })}
                                    sx={{ flex: 1 }} />
                            </Box>

                            <Button type="submit" variant="contained" fullWidth
                                size="large" disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Item'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default EditItem;