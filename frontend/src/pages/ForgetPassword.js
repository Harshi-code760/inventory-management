import {useState} from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import {
    Box, Button, Card, CardContent, TextField,
    Typography, Alert, CircularProgress
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('auth/password-reset/', { email });
            setMessage('If this email exists, a reset link has been sent to you');
        } catch (err) {
            setMessage('Something went wrong');
        }
        setLoading(false);
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
                        <LockResetIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h5" color="primary">Forgot Password</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Enter your email to receive a reset link
                        </Typography>
                    </Box>

                    {message ? (
                        <Box sx={{ textAlign: 'center' }}>
                            <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>
                            <Button variant="contained" fullWidth onClick={() => navigate('/login')}>
                                Back to Login
                            </Button>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField label="Email Address" type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required sx={{ mb: 3 }} />
                            <Button type="submit" variant="contained" fullWidth
                                size="large" disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
                            </Button>
                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontSize: 14 }}>
                                    Back to Login
                                </Link>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ForgetPassword;