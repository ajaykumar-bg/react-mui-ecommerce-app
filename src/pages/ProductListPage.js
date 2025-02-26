import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Box,
	Typography,
	TextField,
	MenuItem,
	InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import ProductFilters from '../components/product/ProductFilters';
import { mockProducts, mockCategories } from '../utils/mockData';

const ProductListPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchQuery = queryParams.get('search') || '';
	const categoryParam = queryParams.get('category') || '';

	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState(searchQuery);
	const [sortBy, setSortBy] = useState('newest');
	const [filters, setFilters] = useState({
		priceRange: [0, 1000],
		categories: categoryParam ? [categoryParam] : [],
		minRating: 0,
	});

	useEffect(() => {
		// Filter products based on search term and filters
		let filteredProducts = [...mockProducts];

		// Search filter
		if (searchTerm) {
			filteredProducts = filteredProducts.filter(
				(product) =>
					product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Category filter
		if (filters.categories.length > 0) {
			filteredProducts = filteredProducts.filter((product) =>
				filters.categories.includes(product.category)
			);
		}

		// Price range filter
		filteredProducts = filteredProducts.filter(
			(product) =>
				product.price >= filters.priceRange[0] &&
				product.price <= filters.priceRange[1]
		);

		// Rating filter
		filteredProducts = filteredProducts.filter(
			(product) => product.rating >= filters.minRating
		);

		// Sort
		switch (sortBy) {
			case 'price-low-high':
				filteredProducts.sort((a, b) => a.price - b.price);
				break;
			case 'price-high-low':
				filteredProducts.sort((a, b) => b.price - a.price);
				break;
			case 'rating':
				filteredProducts.sort((a, b) => b.rating - a.rating);
				break;
			case 'newest':
			default:
				// Assuming the products are already sorted by newest first in the mock data
				break;
		}

		setProducts(filteredProducts);
	}, [searchTerm, sortBy, filters]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return <div>Product List Page</div>;
};

export default ProductListPage;
