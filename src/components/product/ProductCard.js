import React from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Rating,
	Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
	const { addItem } = useCart();

	const handleAddToCart = () => {
		addItem(product);
	};

	return (
		<Card
			sx={{
				maxWidth: 345,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<CardMedia
				component='img'
				height='200'
				image={product.image}
				alt={product.title}
			/>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography gutterBottom variant='h6' component='div' noWrap>
					{product.title}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						mb: 1,
					}}
				>
					{product.description}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
					<Rating
						value={product.rating}
						precision={0.1}
						size='small'
						readOnly
					/>
					<Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
						({product.rating})
					</Typography>
				</Box>
				<Typography variant='h6' color='primary'>
					${product.price.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size='small'
					component={RouterLink}
					to={`/products/${product.id}`}
				>
					View Details
				</Button>
				<Button size='small' color='primary' onClick={handleAddToCart}>
					Add to Cart
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
