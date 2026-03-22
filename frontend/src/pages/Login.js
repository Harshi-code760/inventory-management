import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Inventory Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                 <button type="submit">Login</button>
            </form>
            <p style={{marginTop: '10px'}}>
                <Link to="/forgot-password">Forgot your password?</Link>
            </p>
        </div>
    );
};

export default Login;
