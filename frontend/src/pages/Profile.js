import {useEffect, useState} from "react";
import api from "../api/axios";
import { useNavigate} from "react-router-dom";
import {
    Box, Button, Card, CardContent, TextField,
    Typography, Alert, Container, Avatar, CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';


const Profile = () => {
    const [profile, setProfile] = useState({username: '', email: '', bio: ''});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('auth/profile/')
            .then(response => setProfile(response.data))
            .catch(() => setError('Failed to laod profile.'));

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setError('');

        try {
            await api.patch('auth/profile/', {bio:profile.bio});
            setMessage('Profile updated successfully');
        } catch (err) {
            setError('Update failed');
            setLoading(false);
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                                <PersonIcon sx={{ fontSize: 36 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h5">{profile.username}</Typography>
                                <Typography variant="body2" color="text.secondary">{profile.email}</Typography>
                            </Box>
                        </Box>

                        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField label="Username" value={profile.username}
                                disabled sx={{ mb: 2 }} />
                            <TextField label="Email" value={profile.email}
                                disabled sx={{ mb: 2 }} />
                            <TextField label="Bio" multiline rows={4}
                                value={profile.bio}
                                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                                sx={{ mb: 3 }} />
                            <Button type="submit" variant="contained" fullWidth
                                size="large" disabled={loading}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Profile;