import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Box,
	Grid,
	TextField,
	Button,
	Typography,
	FormControlLabel,
	Checkbox,
} from '@mui/material';

const PaymentForm = ({ initialData, onSubmit }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialData,
	});

	return (
		<Box component='form' onSubmit={handleSubmit(onSubmit)}>
			<Typography variant='h6' gutterBottom>
				Payment Method
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Controller
						name='cardName'
						control={control}
						rules={{ required: 'Name on card is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='Name on card'
								fullWidth
								error={!!errors.cardName}
								helperText={errors.cardName?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name='cardNumber'
						control={control}
						rules={{
							required: 'Card number is required',
							pattern: {
								value: /^\d{16}$/,
								message: 'Please enter a valid 16-digit card number',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Card number'
								fullWidth
								error={!!errors.cardNumber}
								helperText={errors.cardNumber?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='expDate'
						control={control}
						rules={{
							required: 'Expiry date is required',
							pattern: {
								value: /^(0[1-9]|1[0-2])\/\d{2}$/,
								message: 'Please use MM/YY format',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Expiry date (MM/YY)'
								fullWidth
								error={!!errors.expDate}
								helperText={errors.expDate?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='cvv'
						control={control}
						rules={{
							required: 'CVV is required',
							pattern: {
								value: /^\d{3,4}$/,
								message: 'Please enter a valid CVV',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='CVV'
								fullWidth
								error={!!errors.cvv}
								helperText={errors.cvv?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox color='primary' />}
						label='Remember credit card details for next time'
					/>
				</Grid>
				<Grid item xs={12}>
					<Button type='submit' variant='contained' color='primary' fullWidth>
						Continue to Review
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default PaymentForm;
