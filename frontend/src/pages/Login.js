import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
    Box, Card, CardContent, TextField, Button,
    Typography, Alert, CircularProgress
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        }}>
            <Card sx={{ width: '100%', maxWidth: 420, mx: 2, borderRadius: 3, boxShadow: 6 }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <InventoryIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h5" color="primary">
                            Inventory Manager
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Sign in to your account
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Link to="/forgot-password" style={{ color: '#1976d2', textDecoration: 'none', fontSize: 14 }}>
                            Forgot your password?
                        </Link>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
