import sizes from '../sizes';
export default {
	Navbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex -start',
		height: '6vh',
		fontFamily: 'Roboto',
	},

	logo: {
		marginRight: '15px',
		padding: '0 13px',
		fontSize: '22px',
		backgroundColor: '#eceff1',
		fontWeight: '700',
		fontStyle: 'italic',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		"& a": {
			textDecoration: 'none',
			color: 'black'
		},
		[sizes.down('xs')]: {
			display: 'none'
		}
	},

	sliderContainer: {
		"& span": {
			fontWeight: '500'
		}
	},

	slider: {
		width: '340px',
		margin: '0 10px',
		display: 'inline-block',
		[sizes.down('sm')]: {
			width: '150px'
		},
		// the background of the slider
		"& .rc-slider-rail": {
			height: '8px'
		},

		/*  current value progress */
		"& .rc-slider-track": {
			background: 'transparent'
		},

		"& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover": {
			backgroundColor: 'cornflowerblue',
			outline: 'none',
			border: '2px solid cornflowerblue',
			boxShadow: 'none',
			width: '13px',
			height: '13px',
			marginTop: '-3px',
			marginLeft: '-7px'
		},

		"& .rc-slider-handle": {
			backgroundColor: 'white'
		}
	},

	selectContainer: {
		marginLeft: 'auto',
		marginRight: '1rem'
	},

	selectRoot: {
		width: '210px'
	}
}