import React, { useState } from 'react';
import {
	Box,
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
	Paper,
} from '@mui/material';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

const CheckoutForm = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [shippingData, setShippingData] = useState({
		firstName: '',
		lastName: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		phone: '',
	});
	const [paymentData, setPaymentData] = useState({
		cardName: '',
		cardNumber: '',
		expDate: '',
		cvv: '',
	});

	const { clearCart } = useCart();
	const navigate = useNavigate();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleShippingSubmit = (data) => {
		setShippingData(data);
		handleNext();
	};

	const handlePaymentSubmit = (data) => {
		setPaymentData(data);
		handleNext();
	};

	const handlePlaceOrder = () => {
		// In a real app, you would send the order to your backend here
		console.log('Order placed', { shippingData, paymentData });

		// Clear the cart and redirect to the order confirmation page
		clearCart();
		navigate('/orders');
	};

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<ShippingForm
						initialData={shippingData}
						onSubmit={handleShippingSubmit}
					/>
				);
			case 1:
				return (
					<PaymentForm
						initialData={paymentData}
						onSubmit={handlePaymentSubmit}
					/>
				);
			case 2:
				return (
					<ReviewOrder
						shippingData={shippingData}
						paymentData={paymentData}
						onPlaceOrder={handlePlaceOrder}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	return (
		<Paper sx={{ p: 3 }}>
			<Typography component='h1' variant='h4' align='center' gutterBottom>
				Checkout
			</Typography>
			<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<>
				{activeStep === steps.length ? (
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant='h5' gutterBottom>
							Thank you for your order.
						</Typography>
						<Typography variant='subtitle1'>
							Your order number is #2001539. We have emailed your order
							confirmation, and will send you an update when your order has
							shipped.
						</Typography>
						<Button
							variant='contained'
							color='primary'
							onClick={() => navigate('/')}
							sx={{ mt: 3 }}
						>
							Continue Shopping
						</Button>
					</Box>
				) : (
					<>
						{getStepContent(activeStep)}
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
							{activeStep !== 0 && (
								<Button onClick={handleBack} sx={{ mr: 1 }}>
									Back
								</Button>
							)}
						</Box>
					</>
				)}
			</>
		</Paper>
	);
};

export default CheckoutForm;
