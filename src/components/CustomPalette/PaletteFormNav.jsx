import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// Material UI components
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from '@material-ui/core';

// Material UI icons
import {
	AddBox as AddBoxIcon
} from '@material-ui/icons';

// utilities
import { withStyles } from '@material-ui/core/styles';
import PaletteSaveInfo from './PaletteSaveInfo';
import styles from '../../styles/CustomPalette/PaletteFormNavStyles';

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formShowing: false
		};
	}


	handleSubmit = (newPaletteInfo) => {
		this.props.handleSavePalette(newPaletteInfo);
	}

	handleDrawerOpen = () => {
		this.props.handleDrawerOpen();
	}

	showForm = () => {
		this.setState({ formShowing: true });
	}

	hideForm = () => {
		this.setState({ formShowing: false });
	}


	render() {

		const { classes, open, palettes } = this.props;
		const { formShowing } = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<AddBoxIcon />
						</IconButton>

						<Typography variant="h6" noWrap>
							Create A Palette
          </Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to="/">
							<Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
						</Link>
						<Button variant="contained" color="primary" className={classes.button} onClick={this.showForm}>
							Save
      			</Button>
						{formShowing && <PaletteSaveInfo palettes={palettes} handleSavePalette={this.handleSubmit} hideForm={this.hideForm} />}
					</div>
				</AppBar>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);