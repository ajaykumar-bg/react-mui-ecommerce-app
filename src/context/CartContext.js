import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const initialState = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM': {
			const existingItemIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			let newItems;
			if (existingItemIndex >= 0) {
				newItems = state.items.map((item, index) =>
					index === existingItemIndex
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				newItems = [...state.items, { ...action.payload, quantity: 1 }];
			}

			const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
			const totalPrice = newItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);

			return {
				...state,
				items: newItems,
				totalItems,
				totalPrice,
			};
		}

		case 'REMOVE_ITEM': {
			const existingItemIndex = state.items.findIndex(
				(item) => item.id === action.payload.id
			);

			if (existingItemIndex === -1) return state;

			let newItems;
			if (state.items[existingItemIndex].quantity > 1) {
				newItems = state.items.map((item, index) =>
					index === existingItemIndex
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			} else {
				newItems = state.items.filter((item) => item.id !== action.payload.id);
			}

			const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
			const totalPrice = newItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);

			return {
				...state,
				items: newItems,
				totalItems,
				totalPrice,
			};
		}

		case 'UPDATE_QUANTITY': {
			const newItems = state.items.map((item) =>
				item.id === action.payload.id
					? { ...item, quantity: action.payload.quantity }
					: item
			);

			const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
			const totalPrice = newItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);

			return {
				...state,
				items: newItems,
				totalItems,
				totalPrice,
			};
		}

		case 'CLEAR_CART':
			return initialState;

		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState, () => {
		const localData = localStorage.getItem('cart');
		return localData ? JSON.parse(localData) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state));
	}, [state]);

	const addItem = (product) => {
		dispatch({ type: 'ADD_ITEM', payload: product });
	};

	const removeItem = (product) => {
		dispatch({ type: 'REMOVE_ITEM', payload: product });
	};

	const updateQuantity = (id, quantity) => {
		dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				addItem,
				removeItem,
				updateQuantity,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
