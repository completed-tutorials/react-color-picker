import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from '../../styles/DefaultPalette/PaletteStyles';
import { withStyles } from '@material-ui/styles';


class SingleColorPalette extends Component {

	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);

		this.state = {
			format: 'hex'
		}
	}

	//  return all shades of given color
	gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorToFilterBy)
			)
		}

		return shades.slice(1);
	}


	changeFormat = (format) => {
		this.setState({ format });
	}

	render() {

		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;

		return (
			<div className={classes.Palette}>
				<Navbar changeFormat={this.changeFormat} showingAllColors={false} />
				<div className={classes.PaletteColors}>
					{this._shades.map(shade => (
						<ColorBox key={shade.name}
							name={shade.name}
							background={shade[format]}
							showingFullPalette={false}
						/>
					))}
					<Link to={`/palette/${id}`} className={classes.goBack}><span>GO BACK</span></Link>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		)
	}
}

export default withStyles(styles)(SingleColorPalette); 