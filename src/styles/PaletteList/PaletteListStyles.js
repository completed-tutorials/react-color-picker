import sizes from '../sizes';
import bg from '../../assets/bg.svg';

export default {
	"@global": {
		".fade": {
			transition: "opacity 0.2s ease-out"
		},
		".fade-exit": {
			opacity: 1
		},
		".fade-exit-active": {
			opacity: 0,
		}
	},
	root: {
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		/* background by SVGBackgrounds.com */
		backgroundColor: '#6cb1f7',
		backgroundImage: `url(${bg})`,
		overflow: "scroll",
		"& svg": {
			height: '32px',
			width: '32px',
		},
	},
	heading: {
		fontSize: '2rem'
	},

	container: {
		width: "50%",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		flexWrap: "wrap",
		[sizes.down('xl')]: {
			width: "60%"
		},
		[sizes.down('xs')]: {
			width: "75%"
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'white',
		"& a": {
			color: "white"
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '2.5rem',
		[sizes.down('md ')]: {
			gridTemplateColumns: 'repeat(2,50%)'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)',
			gridGap: '1.4rem',
		}
	}
}