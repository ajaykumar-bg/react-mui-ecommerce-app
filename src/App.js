import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/auth/PrivateRoute';
import { Box } from '@mui/material';

function App() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<Box sx={{ flexGrow: 1, py: 3 }}>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/products' element={<ProductListPage />} />
					<Route path='/products/:id' element={<ProductDetailPage />} />
					<Route path='/cart' element={<CartPage />} />
					<Route
						path='/checkout'
						element={
							<PrivateRoute>
								<CheckoutPage />
							</PrivateRoute>
						}
					/>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route
						path='/profile'
						element={
							<PrivateRoute>
								<ProfilePage />
							</PrivateRoute>
						}
					/>
					<Route
						path='/orders'
						element={
							<PrivateRoute>
								<OrderHistoryPage />
							</PrivateRoute>
						}
					/>
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Box>
			<Footer />
		</Box>
	);
}

export default App;
