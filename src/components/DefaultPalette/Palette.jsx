import React, { Component } from 'react';
import ColorBox from './ColorBox';

import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import styles from '../../styles/DefaultPalette/PaletteStyles';
import { withStyles } from '@material-ui/styles';

class Palette extends Component {

	constructor(props) {
		super(props);
		this.state = {
			level: 500,
			format: "hex"
		}
	}

	changeLevel = (level) => {
		this.setState({ level });
	}

	changeFormat = (format) => {
		this.setState({ format })
	}

	render() {

		const { level, format } = this.state;
		const { colors, paletteName, emoji,
			// id
		} = this.props.palette;
		const { classes } = this.props;

		return (
			<div className={classes.Palette}>
				<Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat} showingAllColors />

				<div className={classes.PaletteColors}>
					{colors[level].map(color =>
						<ColorBox key={color.id}
							background={color[format]}
							name={color.name}
							showingFullPalette
						// moreURL={`/palette/${id}/${color.id}`}
						/>
					)}
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		)
	}
}

export default withStyles(styles)(Palette);