import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Box,
	Grid,
	TextField,
	Button,
	Typography,
	MenuItem,
} from '@mui/material';

const countries = [
	{ code: 'US', name: 'United States' },
	{ code: 'CA', name: 'Canada' },
	{ code: 'MX', name: 'Mexico' },
	// Add more countries as needed
];

const states = [
	{ code: 'AL', name: 'Alabama' },
	{ code: 'AK', name: 'Alaska' },
	{ code: 'AZ', name: 'Arizona' },
	{ code: 'AR', name: 'Arkansas' },
	{ code: 'CA', name: 'California' },
	// Add more states as needed
];

const ShippingForm = ({ initialData, onSubmit }) => {
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
				Shipping Address
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<Controller
						name='firstName'
						control={control}
						rules={{ required: 'First name is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='First name'
								fullWidth
								error={!!errors.firstName}
								helperText={errors.firstName?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='lastName'
						control={control}
						rules={{ required: 'Last name is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='Last name'
								fullWidth
								error={!!errors.lastName}
								helperText={errors.lastName?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name='address1'
						control={control}
						rules={{ required: 'Address is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='Address line 1'
								fullWidth
								error={!!errors.address1}
								helperText={errors.address1?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name='address2'
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label='Address line 2 (optional)'
								fullWidth
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='city'
						control={control}
						rules={{ required: 'City is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='City'
								fullWidth
								error={!!errors.city}
								helperText={errors.city?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='state'
						control={control}
						rules={{ required: 'State is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='State/Province/Region'
								fullWidth
								select
								error={!!errors.state}
								helperText={errors.state?.message}
							>
								{states.map((state) => (
									<MenuItem key={state.code} value={state.code}>
										{state.name}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='zip'
						control={control}
						rules={{
							required: 'Zip code is required',
							pattern: {
								value: /^\d{5}(-\d{4})?$/,
								message: 'Invalid zip code format',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Zip / Postal code'
								fullWidth
								error={!!errors.zip}
								helperText={errors.zip?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controller
						name='country'
						control={control}
						rules={{ required: 'Country is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='Country'
								fullWidth
								select
								error={!!errors.country}
								helperText={errors.country?.message}
							>
								{countries.map((country) => (
									<MenuItem key={country.code} value={country.code}>
										{country.name}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name='phone'
						control={control}
						rules={{
							required: 'Phone number is required',
							pattern: {
								value: /^\d{10}$/,
								message: 'Please enter a valid 10-digit phone number',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Phone Number'
								fullWidth
								error={!!errors.phone}
								helperText={errors.phone?.message}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button type='submit' variant='contained' color='primary' fullWidth>
						Continue to Payment
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ShippingForm;
