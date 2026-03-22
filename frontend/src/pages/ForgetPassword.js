import {useState} from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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

    return(
        <div className="login-container">
            <h2>ForgetPassword</h2>
            {message ? (
                <div>
                    <p style={{ color: 'green' }}>{message}</p>
                    <button
                        onClick={() => navigate('/login')}>Back to login
                    </button>
                </div>
            ):(
                <form onSubmit={handleSubmit}>
                    <input type="email"
                           placeholder="Enter your email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           required
                />
                <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                <button type="button" onClick={() => navigate('/login')}>
                    Back to Login
                </button>
                </form>
            )}
        </div>
    )

}

export default ForgetPassword;