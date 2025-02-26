import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#f5f5f5',
		},
	},
	typography: {
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
		h1: {
			fontSize: '2.5rem',
			fontWeight: 500,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 500,
		},
		h3: {
			fontSize: '1.8rem',
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					textTransform: 'none',
				},
			},
		},
	},
});

export default theme;
