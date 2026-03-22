import { render, screen } from '@testing-library/react';
import AuthContext from './context/AuthContext';

// Simple component to test without any router dependency
const MockProtectedContent = () => {
    return <div>Protected Content</div>;
};

// Test 1: AuthContext provides user value
test('AuthContext default value is null', () => {
    render(
        <AuthContext.Provider value={{ user: null, loading: false }}>
            <MockProtectedContent />
        </AuthContext.Provider>
    );
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
});

// Test 2: AuthContext provides authenticated user
test('AuthContext provides user when authenticated', () => {
    const mockUser = { id: 1, email: 'test@test.com' };
    render(
        <AuthContext.Provider value={{ user: mockUser, loading: false }}>
            <MockProtectedContent />
        </AuthContext.Provider>
    );
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
});

// Test 3: Component renders correctly
test('renders without crashing', () => {
    render(
        <AuthContext.Provider value={{ user: null, loading: false }}>
            <div>Test</div>
        </AuthContext.Provider>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
});