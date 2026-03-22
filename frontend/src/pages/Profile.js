import {useEffect, useState} from "react";
import api from "../api/axios";
import { useNavigate} from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState({username: '', email: '', bio: ''});
    const [message, setMessage] = useState('');
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
        setError('');

        try {
            await api.patch('auth/profile/', {bio:profile.bio});
            setMessage('Profile updated successfully');
        } catch (err) {
            setError('Update failed');
        }
    };

    return (
        <div className="container">
            <h2>My Profile</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text" value={profile.username} disabled
                        style={{ background: '#f0f0f0' }} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" value={profile.email} disabled
                        style={{ background: '#f0f0f0' }} />
                </div>
                <div>
                    <label>Bio: </label>
                    <textarea
                        value={profile.bio}
                        onChange={e => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        placeholder="Tell us about yourself..."
                    />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => navigate('/dashboard')}
                    style={{ marginLeft: '10px' }}>
                    Back to Dashboard
                </button>
            </form>
        </div>
    );

};

export default Profile;