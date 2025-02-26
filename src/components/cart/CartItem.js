import React from 'react';
import {
	Box,
	Typography,
	IconButton,
	Avatar,
	TextField,
	Card,
	CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
	const { addItem, removeItem, updateQuantity } = useCart();

	const handleQuantityChange = (e) => {
		const value = parseInt(e.target.value);
		if (isNaN(value) || value < 1) return;
		updateQuantity(item.id, value);
	};

	const handleIncrease = () => {
		addItem(item);
	};

	const handleDecrease = () => {
		removeItem(item);
	};

	const handleRemove = () => {
		updateQuantity(item.id, 0);
	};

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Avatar
						src={item.image}
						alt={item.title}
						variant='rounded'
						sx={{ width: 80, height: 80, mr: 2 }}
					/>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant='h6' noWrap>
							{item.title}
						</Typography>
						<Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
							Unit Price: ${item.price.toFixed(2)}
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton size='small' onClick={handleDecrease}>
								<RemoveIcon />
							</IconButton>
							<TextField
								size='small'
								value={item.quantity}
								onChange={handleQuantityChange}
								inputProps={{ min: 1, style: { textAlign: 'center' } }}
								sx={{ width: '60px', mx: 1 }}
							/>
							<IconButton size='small' onClick={handleIncrease}>
								<AddIcon />
							</IconButton>
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							ml: 2,
						}}
					>
						<Typography variant='h6' color='primary'>
							${(item.price * item.quantity).toFixed(2)}
						</Typography>
						<IconButton color='error' onClick={handleRemove}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default CartItem;
