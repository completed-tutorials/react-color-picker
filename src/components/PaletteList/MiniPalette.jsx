import React, { memo } from 'react';

import styles from '../../styles/PaletteList/MiniPaletteStyles';
import { withStyles } from '@material-ui/styles';
import { Delete as DeleteIcon } from '@material-ui/icons';

function MiniPalette(props) {

	const handleDelete = (e) => {
		e.stopPropagation();
		props.openDeleteDialog(props.id);
	}

	const handleClick = () => {
		props.goToPalette(props.id);
	}

	const { classes, paletteName, emoji, colors } = props;

	return (
		<div className={classes.root} onClick={handleClick}>
			<DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
			<div className={classes.colors}>
				{colors.map(color => (
					<div className={classes.miniColor}
						style={{ backgroundColor: color.color }}
						key={color.name}>
					</div>
				))}
			</div>
			<h5 className={classes.title}>
				{paletteName} <span className={classes.emoji} role="img" aria-label="emoji" aria-labelledby="emoji">{emoji}</span>
			</h5>
		</div>
	)
}

export default withStyles(styles)(memo(MiniPalette));