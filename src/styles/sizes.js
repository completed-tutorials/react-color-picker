
export default {
	sizes: {
		xs: '576px',
		sm: '768px',
		md: '992px',
		lg: '1200px',
		xl: '1600px'
	},
	up(size) {
		return `@media (min-width: ${this.sizes[size]})`
	},

	down(size) {
		return `@media (max-width: ${this.sizes[size]})`
	}
}