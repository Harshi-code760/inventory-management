import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if(token) {
            setUser(jwtDecode(token));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('auth/login/', {email, password});
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setUser(jwtDecode(response.data.access));
    };

    const logout = () => {
        localStorage.removeItem('access_time');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;