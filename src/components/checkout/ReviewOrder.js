import React from 'react';
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	Grid,
	Button,
	Divider,
} from '@mui/material';
import { useCart } from '../../context/CartContext';

const ReviewOrder = ({ shippingData, paymentData, onPlaceOrder }) => {
	const { items, totalPrice } = useCart();
	const shippingCost = totalPrice > 100 ? 0 : 10;
	const tax = totalPrice * 0.07;
	const orderTotal = totalPrice + shippingCost + tax;

	return (
		<Box>
			<Typography variant='h6' gutterBottom>
				Order Summary
			</Typography>
			<List disablePadding>
				{items.map((item) => (
					<ListItem key={item.id} sx={{ py: 1, px: 0 }}>
						<ListItemText
							primary={item.title}
							secondary={`Quantity: ${item.quantity}`}
						/>
						<Typography variant='body2'>
							${(item.price * item.quantity).toFixed(2)}
						</Typography>
					</ListItem>
				))}
				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Subtotal' />
					<Typography variant='subtitle1'>${totalPrice.toFixed(2)}</Typography>
				</ListItem>
				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Shipping' />
					<Typography variant='body2'>
						{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
					</Typography>
				</ListItem>
				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Tax' />
					<Typography variant='body2'>${tax.toFixed(2)}</Typography>
				</ListItem>
				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary='Total' />
					<Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
						${orderTotal.toFixed(2)}
					</Typography>
				</ListItem>
			</List>
			<Divider sx={{ my: 2 }} />
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom>
						Shipping
					</Typography>
					<Typography gutterBottom>
						{shippingData.firstName} {shippingData.lastName}
					</Typography>
					<Typography gutterBottom>
						{shippingData.address1}
						{shippingData.address2 ? `, ${shippingData.address2}` : ''}
					</Typography>
					<Typography gutterBottom>
						{shippingData.city}, {shippingData.state} {shippingData.zip}
					</Typography>
					<Typography gutterBottom>{shippingData.country}</Typography>
					<Typography gutterBottom>{shippingData.phone}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom>
						Payment Details
					</Typography>
					<Typography gutterBottom>{paymentData.cardName}</Typography>
					<Typography gutterBottom>
						Card Number: xxxx-xxxx-xxxx-{paymentData.cardNumber.slice(-4)}
					</Typography>
					<Typography gutterBottom>
						Expiry Date: {paymentData.expDate}
					</Typography>
				</Grid>
			</Grid>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
				<Button
					variant='contained'
					color='primary'
					onClick={onPlaceOrder}
					sx={{ mt: 3 }}
				>
					Place Order
				</Button>
			</Box>
		</Box>
	);
};

export default ReviewOrder;
