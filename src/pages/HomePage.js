import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { mockProducts, mockCategories } from '../utils/mockData';

const HomePage = () => {
	// For the homepage, we'll show featured products (first 4)
	const featuredProducts = mockProducts.slice(0, 4);

	return (
		<Container maxWidth='lg'>
			{/* Hero Section */}
			<Paper
				sx={{
					position: 'relative',
					backgroundColor: 'grey.800',
					color: '#fff',
					mb: 4,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundImage: 'url(https://via.placeholder.com/1200x400)',
					height: 400,
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						right: 0,
						left: 0,
						backgroundColor: 'rgba(0,0,0,.3)',
					}}
				/>
				<Grid container>
					<Grid item md={6}>
						<Box
							sx={{
								position: 'relative',
								p: 4,
								pr: { md: 0 },
							}}
						>
							<Typography
								component='h1'
								variant='h3'
								color='inherit'
								gutterBottom
							>
								Spring Collection 2025
							</Typography>
							<Typography variant='h5' color='inherit' paragraph>
								Discover our newest arrivals and refresh your style for the new
								season.
							</Typography>
							<Button
								variant='contained'
								component={RouterLink}
								to='/products'
								size='large'
							>
								Shop Now
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Paper>

			{/* Featured Products Section */}
			<ProductList products={featuredProducts} title='Featured Products' />

			{/* Categories Grid */}
			<Typography variant='h4' component='h2' sx={{ mt: 6, mb: 3 }}>
				Shop by Category
			</Typography>
			<Grid container spacing={3}>
				{mockCategories.slice(0, 6).map((category) => (
					<Grid item key={category} xs={12} sm={6} md={4}>
						<Paper
							component={RouterLink}
							to={`/products?category=${category}`}
							sx={{
								height: 150,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'primary.light',
								color: 'white',
								textDecoration: 'none',
								'&:hover': {
									backgroundColor: 'primary.main',
									transform: 'scale(1.02)',
									transition: 'all 0.3s',
								},
							}}
						>
							<Typography variant='h5'>{category}</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>

			{/* Call to Action */}
			<Paper
				sx={{
					p: 4,
					my: 6,
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
					alignItems: 'center',
					justifyContent: 'space-between',
					bgcolor: 'background.paper',
				}}
			>
				<Box sx={{ mb: { xs: 2, md: 0 } }}>
					<Typography variant='h5' component='h3' gutterBottom>
						Subscribe to Our Newsletter
					</Typography>
					<Typography variant='body1'>
						Get updates on new arrivals, special offers and more.
					</Typography>
				</Box>
				<Button variant='outlined' size='large' component={RouterLink} to='#'>
					Sign Up
				</Button>
			</Paper>
		</Container>
	);
};

export default HomePage;
