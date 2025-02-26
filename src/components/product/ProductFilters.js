import React, { useState } from 'react';
import {
	Box,
	Typography,
	Slider,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductFilters = ({ categories, onFilterChange }) => {
	const [priceRange, setPriceRange] = useState([0, 1000]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [minRating, setMinRating] = useState(0);

	const handlePriceChange = (event, newValue) => {
		setPriceRange(newValue);
	};

	const handleCategoryChange = (event) => {
		const value = event.target.value;
		setSelectedCategories((prev) => {
			if (event.target.checked) {
				return [...prev, value];
			} else {
				return prev.filter((category) => category !== value);
			}
		});
	};

	const handleRatingChange = (event, newValue) => {
		setMinRating(newValue);
	};

	const handleApplyFilters = () => {
		onFilterChange({
			priceRange,
			categories: selectedCategories,
			minRating,
		});
	};

	const handleResetFilters = () => {
		setPriceRange([0, 1000]);
		setSelectedCategories([]);
		setMinRating(0);
		onFilterChange({
			priceRange: [0, 1000],
			categories: [],
			minRating: 0,
		});
	};

	return (
		<Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
			<Typography variant='h6' gutterBottom>
				Filters
			</Typography>

			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Price Range</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{ px: 2 }}>
						<Slider
							value={priceRange}
							onChange={handlePriceChange}
							valueLabelDisplay='auto'
							min={0}
							max={1000}
						/>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography variant='body2'>${priceRange[0]}</Typography>
							<Typography variant='body2'>${priceRange[1]}</Typography>
						</Box>
					</Box>
				</AccordionDetails>
			</Accordion>

			<Divider sx={{ my: 2 }} />

			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Categories</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormControl component='fieldset'>
						<FormGroup>
							{categories.map((category) => (
								<FormControlLabel
									key={category}
									control={
										<Checkbox
											checked={selectedCategories.includes(category)}
											onChange={handleCategoryChange}
											value={category}
										/>
									}
									label={category}
								/>
							))}
						</FormGroup>
					</FormControl>
				</AccordionDetails>
			</Accordion>

			<Divider sx={{ my: 2 }} />

			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Minimum Rating</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{ px: 2 }}>
						<Slider
							value={minRating}
							onChange={handleRatingChange}
							step={0.5}
							marks
							min={0}
							max={5}
							valueLabelDisplay='auto'
						/>
					</Box>
				</AccordionDetails>
			</Accordion>

			<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='outlined' onClick={handleResetFilters}>
					Reset
				</Button>
				<Button variant='contained' onClick={handleApplyFilters}>
					Apply Filters
				</Button>
			</Box>
		</Box>
	);
};

export default ProductFilters;
