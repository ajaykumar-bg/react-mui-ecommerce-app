import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
	return (
		<Box
			sx={{
				bgcolor: 'primary.main',
				color: 'white',
				py: 3,
				mt: 'auto',
			}}
		>
			<Container maxWidth='lg'>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={4}>
						<Typography variant='h6' gutterBottom>
							SHOP
						</Typography>
						<Typography variant='body2'>
							Your one-stop shop for all your shopping needs.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant='h6' gutterBottom>
							Quick Links
						</Typography>
						<Link
							component={RouterLink}
							to='/'
							color='inherit'
							display='block'
							sx={{ mb: 1 }}
						>
							Home
						</Link>
						<Link
							component={RouterLink}
							to='/products'
							color='inherit'
							display='block'
							sx={{ mb: 1 }}
						>
							Products
						</Link>
						<Link
							component={RouterLink}
							to='/cart'
							color='inherit'
							display='block'
							sx={{ mb: 1 }}
						>
							Cart
						</Link>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant='h6' gutterBottom>
							Contact Us
						</Typography>
						<Typography variant='body2' paragraph>
							123 Shop Street, Shopping City
						</Typography>
						<Typography variant='body2' paragraph>
							Email: support@shop.com
						</Typography>
						<Typography variant='body2'>Phone: +1 (123) 456-7890</Typography>
					</Grid>
				</Grid>
				<Box mt={3}>
					<Typography variant='body2' align='center'>
						© {new Date().getFullYear()} SHOP. All rights reserved.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
