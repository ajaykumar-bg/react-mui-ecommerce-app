import React from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Divider,
	Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ totalItems, totalPrice }) => {
	const navigate = useNavigate();
	const shippingCost = totalPrice > 100 ? 0 : 10;
	const tax = totalPrice * 0.07;
	const orderTotal = totalPrice + shippingCost + tax;

	const handleCheckout = () => {
		navigate('/checkout');
	};

	return (
		<Card>
			<CardContent>
				<Typography variant='h6' gutterBottom>
					Order Summary
				</Typography>
				<Box sx={{ my: 2 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
						<Typography variant='body1'>Items ({totalItems})</Typography>
						<Typography variant='body1'>${totalPrice.toFixed(2)}</Typography>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
						<Typography variant='body1'>Shipping</Typography>
						<Typography variant='body1'>
							{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
						<Typography variant='body1'>Tax</Typography>
						<Typography variant='body1'>${tax.toFixed(2)}</Typography>
					</Box>
				</Box>
				<Divider />
				<Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
					<Typography variant='h6'>Total</Typography>
					<Typography variant='h6' color='primary'>
						${orderTotal.toFixed(2)}
					</Typography>
				</Box>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					size='large'
					onClick={handleCheckout}
					disabled={totalItems === 0}
				>
					Checkout
				</Button>
			</CardContent>
		</Card>
	);
};

export default CartSummary;
