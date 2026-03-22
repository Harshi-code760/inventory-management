import {useState} from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        if(formData.password.length < 8) {
            setError('Password must be 8 characters left');
            return;
        }

        try{
            await api.post('auth/register/', formData);
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (data?.email) setError('Email: ' + data.email[0]);
            else if (data?.username) setError('Username: ' + data.username[0]);
            else if (data?.password) setError('Password: ' + data.password[0]);
            else setError('Registeration failed.');
        }
    };

    return (
        <div className="login-container">
            <h2>Create Account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password (min 8 characters)"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );

};

export default Register;