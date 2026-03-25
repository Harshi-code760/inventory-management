import {useState} from "react";
import api from "../api/axios";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
    Box, Button, Card, CardContent, TextField,
    Typography, Alert, CircularProgress
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(password !== confirm) {
            setError('Password doesnt match');
            return;
        }

        if(password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try{
            await api.post('auth/password-reset/confirm/', {token,password});
            setMessage('Password reset successful');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Reset failed'); 
        }
    };

    if(!token) {
        return (
            <div className="login-container">
                <p style={{color:'red'}}>Invalid reset link </p>
                <button onClick={() => navigate('/login')}>Back to login</button>
            </div>
        );
    }

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
                        <Typography variant="h5" color="primary">Reset Password</Typography>
                    </Box>

                    {message ? (
                        <Box sx={{ textAlign: 'center' }}>
                            <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>
                            <Typography variant="body2" color="text.secondary">
                                Redirecting to login...
                            </Typography>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit}>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            <TextField label="New Password" type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required sx={{ mb: 2 }} />
                            <TextField label="Confirm Password" type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                required sx={{ mb: 3 }} />
                            <Button type="submit" variant="contained" fullWidth
                                size="large" disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
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
export default ResetPassword;