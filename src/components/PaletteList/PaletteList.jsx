import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

import styles from '../../styles/PaletteList/PaletteListStyles';
import { withStyles } from '@material-ui/styles';


import {
	Dialog,
	DialogTitle,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@material-ui/core';

import {
	blue,
	red
} from '@material-ui/core/colors';


import {
	AddToPhotos as AddToPhotosIcon,
	Delete as DeleteIcon,
	Close as CloseIcon,
} from '@material-ui/icons';


import {
	CSSTransition,
	TransitionGroup,
} from 'react-transition-group';

class PaletteList extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			openDeleteDialog: false,
			deleteId: ''
		}
	}

	gotToPalette = (paletteId) => {
		this.props.history.push(`/palette/${paletteId}`);
	}

	openDeleteDialog = (id) => {
		this.setState({ openDeleteDialog: true, deleteId: id });
	}
	closeDeleteDialog = () => {
		this.setState({ openDeleteDialog: false, deleteId: '' });
	}

	handleDelete = () => {
		this.props.deletePalette(this.state.deleteId);
		this.closeDeleteDialog();
	}

	render() {

		const { palettes, classes } = this.props;
		const { openDeleteDialog } = this.state;


		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>React Colors</h1>
						<Link to='/palette/new'>
							<AddToPhotosIcon />
						</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map(palette => (
							<CSSTransition key={palette.id} timeout={200} classNames="fade">
								<MiniPalette {...palette}
									key={palette.id} id={palette.id}
									goToPalette={this.gotToPalette}
									openDeleteDialog={this.openDeleteDialog}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDeleteDialog}>
					<DialogTitle id="delete-dialog-title">Are You Sure You Want To Delete This Palette?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<DeleteIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={this.closeDeleteDialog} >
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		)
	}
}

export default withStyles(styles)(PaletteList);