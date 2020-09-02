import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import styles from '../../styles/CustomPalette/DraggableColorBoxStyles'
import { withStyles } from '@material-ui/styles';

import { Delete as DeleteIcon } from '@material-ui/icons';


function DraggableColorBox(props) {

	const {
		color,
		name,
		handleDelete,
		classes
	} = props;


	const handleDeleteClick = () => {
		handleDelete(name);
	}

	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={handleDeleteClick} />
			</div>
		</div>
	)
}

export default withStyles(styles)(
	SortableElement(DraggableColorBox)
);