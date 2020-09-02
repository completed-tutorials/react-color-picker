import chroma from 'chroma-js';
import sizes from '../sizes';

// root styles
const gray = 'rgba(255, 255, 255, 0.3)';

export default {

	ColorBox: {
		width: '20%',
		height: props => props.showingFullPalette ? '25%' : '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		"&:hover button": {
			opacity: 1
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: props => props.showingFullPalette ? "20%" : "33.3333%"
		},
		[sizes.down('md')]: {
			width: '50%',
			height: props => props.showingFullPalette ? "10%" : "20%"
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: props => props.showingFullPalette ? "5%" : "10%"
		}
	},
	copyTextColor: {
		// >= 0.7 bright color
		color: props => chroma(props.background).luminance() >= 0.7 ? 'black' : 'white'
	},
	colorNameColor: {
		// <= 0.8 dark color
		color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
	},
	seeMoreButton: {
		color: props => chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white',
		background: gray,
		position: 'absolute',
		border: 'none',
		right: '0px',
		bottom: '0px',
		width: '80px',
		height: '30px',
		textAlign: 'center',
		lineHeight: '30px',
		textTransform: 'uppercase'
	},

	copyButton: {
		color: props => chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.6)' : 'white',
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
		opacity: '0',
		transition: '0.2s ease-in-out'
	},

	boxContent: {
		position: 'absolute',
		width: '100%',
		left: '0px',
		bottom: '0px',
		padding: '10px',
		color: 'black',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px'
	},

	copyOverlay: {
		opacity: '0',
		zIndex: '0',
		width: '100%',
		height: '100%',
		transform: 'scale(0.1)',
		transition: 'transform 0.6s ease-in-out, opacity 0.1s ease in-out'
	},
	showCopyOverlay: {
		opacity: '1',
		transform: 'scale(50)',
		zIndex: '10',
		position: 'absolute'
	},

	copyMessage: {
		position: 'fixed',
		left: '0',
		top: '0',
		right: '0',
		bottom: '0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '4rem',
		transform: 'scale(0.1)',
		opacity: '0',
		color: 'white',
		'& h1': {
			fontWeight: '400',
			width: '100 %',
			textAlign: 'center',
			marginBottom: '0',
			padding: '1rem',
			[sizes.down("xs")]: {
				fontSize: '6rem'
			}
		},
		'& p': {
			fontSize: '2rem',
			margin: '0',
			fontWeight: '200',
		}
	},
	showCopyMessage: {
		opacity: '1',
		transform: 'scale(1)',
		zIndex: '10',
		transition: 'all 0.4s 0.1s ease-in-out',
	}
};
