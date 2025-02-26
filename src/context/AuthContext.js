import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is stored in localStorage
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setCurrentUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = (userData) => {
		// In a real app, you would make an API call here
		setCurrentUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	const register = (userData) => {
		// In a real app, you would make an API call here
		const newUser = { ...userData, id: Date.now() };
		setCurrentUser(newUser);
		localStorage.setItem('user', JSON.stringify(newUser));
		return newUser;
	};

	const logout = () => {
		setCurrentUser(null);
		localStorage.removeItem('user');
	};

	const value = {
		currentUser,
		login,
		register,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
