import sizes from '../sizes';

export default {
	Palette: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},

	PaletteColors: {
		height: '90%',
		width: '100%'
	},

	goBack: {
		// ColorBox Styles
		width: '20%',
		height: props => props.showingFullPalette ? '25%' : '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		opacity: 1,
		backgroundColor: 'rgb(175, 175, 175)',
		"& span": {
			color: 'white',
			width: '100px',
			height: '30px',
			position: 'absolute',
			display: 'inline-block',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			textAlign: 'center',
			outline: 'none',
			textDecoration: 'none',
			fontWeight: '700',
			background: 'none',
			fontSize: '1rem',
			lineHeight: '30px',
			textTransform: 'uppercase',
			border: 'none',
			transition: '0.2s ease-in-out',
			pointerEvents: 'none'
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: "33.3333% !important"
		},
		[sizes.down('md')]: {
			width: '50%',
			height: "20% !important"
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: '10% !important'
		},
	}
};
