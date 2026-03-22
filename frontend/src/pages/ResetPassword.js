import {useState} from "react";
import api from "../api/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
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
        <div className="login-container">
            <h2>Reset Password</h2>
            {message ? (
                <p style={{ color: 'green' }}>{message} Redirecting to login...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
};
















export default ResetPassword;