import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	Badge,
	InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const pages = [
	{ title: 'Home', path: '/' },
	{ title: 'Products', path: '/products' },
];

const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const { currentUser, logout } = useAuth();
	const { totalItems } = useCart();
	const navigate = useNavigate();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSearch = (e) => {
		if (e.key === 'Enter') {
			navigate(`/products?search=${e.target.value}`);
		}
	};

	const handleLogout = () => {
		logout();
		handleCloseUserMenu();
		navigate('/');
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{/* Logo - Desktop */}
					<Typography
						variant='h6'
						noWrap
						component={RouterLink}
						to='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						SHOP
					</Typography>

					{/* Mobile Menu */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='menu'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.title}
									onClick={handleCloseNavMenu}
									component={RouterLink}
									to={page.path}
								>
									<Typography textAlign='center'>{page.title}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{/* Logo - Mobile */}
					<Typography
						variant='h5'
						noWrap
						component={RouterLink}
						to='/'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						SHOP
					</Typography>

					{/* Desktop Menu */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.title}
								component={RouterLink}
								to={page.path}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.title}
							</Button>
						))}
					</Box>

					{/* Search */}
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
							onKeyPress={handleSearch}
						/>
					</Search>

					{/* Cart Icon */}
					<Box sx={{ ml: 2 }}>
						<IconButton
							color='inherit'
							component={RouterLink}
							to='/cart'
							aria-label='cart'
						>
							<Badge badgeContent={totalItems} color='secondary'>
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					</Box>

					{/* User Menu */}
					<Box sx={{ ml: 1 }}>
						<Tooltip title='Account settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								{currentUser ? (
									<Avatar alt={currentUser.name} src={currentUser.avatar} />
								) : (
									<AccountCircleIcon sx={{ color: 'white' }} />
								)}
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{currentUser
								? [
										<MenuItem
											key='profile'
											onClick={handleCloseUserMenu}
											component={RouterLink}
											to='/profile'
										>
											<Typography textAlign='center'>Profile</Typography>
										</MenuItem>,
										<MenuItem
											key='orders'
											onClick={handleCloseUserMenu}
											component={RouterLink}
											to='/orders'
										>
											<Typography textAlign='center'>Orders</Typography>
										</MenuItem>,
										<MenuItem key='logout' onClick={handleLogout}>
											<Typography textAlign='center'>Logout</Typography>
										</MenuItem>,
								  ]
								: [
										<MenuItem
											key='login'
											onClick={handleCloseUserMenu}
											component={RouterLink}
											to='/login'
										>
											<Typography textAlign='center'>Login</Typography>
										</MenuItem>,
										<MenuItem
											key='register'
											onClick={handleCloseUserMenu}
											component={RouterLink}
											to='/register'
										>
											<Typography textAlign='center'>Register</Typography>
										</MenuItem>,
								  ]}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
