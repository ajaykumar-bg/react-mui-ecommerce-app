import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, title }) => {
	if (!products || products.length === 0) {
		return (
			<Box sx={{ py: 4 }}>
				<Typography variant='h5'>No products found</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ py: 4 }}>
			{title && (
				<Typography variant='h4' component='h1' gutterBottom>
					{title}
				</Typography>
			)}
			<Grid container spacing={3}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ProductList;
