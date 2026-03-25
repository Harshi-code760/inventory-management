import { useContext, useEffect, useState } from "react";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {
    Box, Button, Chip, CircularProgress, Container,
    IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography,
    AppBar, Toolbar, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import InventoryIcon from '@mui/icons-material/Inventory';


const Dashboard = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLow, setFilterLow] = useState(false);
    const { logout } = useContext(AuthContext);

    const loadItems = async () => {
        try {
            const url = filterLow ? 'items/?low=true' : 'items/';
            const response = await api.get(url);
            setItems(response.data.results || response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch inventory', err);
        }
    };

    const deleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await api.delete(`items/${id}/`);
                loadItems();
            } catch (err) {
                alert("Can't delete item.");
            }
        }
    };

    useEffect(() => {
        loadItems();
    }, [filterLow]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <InventoryIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Inventory Manager
                    </Typography>
                    <Tooltip title="My Profile">
                        <IconButton color="inherit" onClick={() => navigate('/profile')}>
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={logout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">Inventory</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant={filterLow ? 'contained' : 'outlined'}
                            color={filterLow ? 'warning' : 'primary'}
                            startIcon={<WarningIcon />}
                            onClick={() => setFilterLow(!filterLow)}
                        >
                            {filterLow ? 'Show All' : 'Low Stock Only'}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/add-item')}
                        >
                            Add Item
                        </Button>
                    </Box>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Category</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Quantity</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 700 }} align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                            <Typography color="text.secondary">
                                                No items found. Add your first item!
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    items.map(item => (
                                        <TableRow key={item.id} hover>
                                            <TableCell>
                                                <Typography fontWeight={600}>{item.name}</Typography>
                                                {item.description && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.description}
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>{item.category_name || 'Uncategorized'}</TableCell>
                                            <TableCell>
                                                <Typography fontWeight={item.is_low ? 700 : 400}
                                                    color={item.is_low ? 'error' : 'text.primary'}>
                                                    {item.quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                {item.is_low ? (
                                                    <Chip label="Low Stock" color="error" size="small"
                                                        icon={<WarningIcon />} />
                                                ) : (
                                                    <Chip label="In Stock" color="success" size="small" />
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Edit">
                                                    <IconButton color="primary"
                                                        onClick={() => navigate(`/edit/${item.id}`)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error"
                                                        onClick={() => deleteItem(item.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;