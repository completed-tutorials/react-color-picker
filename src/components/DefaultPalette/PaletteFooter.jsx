import React from 'react';

import styles from '../../styles/DefaultPalette/PaletteFooterStyles';
import { withStyles } from '@material-ui/styles';

function PaletteFooter(props) {

	const { paletteName, emoji, classes } = props;
	return (
		<footer className={classes.PaletteFooter}>
			{paletteName}
			<span className={classes.emoji} role="img" aria-label="emoji" aria-labelledby="emoji">{emoji}</span>
		</footer>
	)
}

export default withStyles(styles)(PaletteFooter);