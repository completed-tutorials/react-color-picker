import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {
	Select,
	MenuItem,
	Snackbar,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import styles from '../../styles/DefaultPalette/NavbarStyles';
import { withStyles } from '@material-ui/styles';

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			format: "hex",
			open: false
		};
	}

	handleChangeFormat = (e) => {
		const format = e.target.value;
		this.setState({ format, open: true });
		this.props.changeFormat(format);
	}

	closeSnackbar = () => {
		this.setState({ open: false });
	}

	render() {

		const { level, changeLevel, showingAllColors,
			classes } = this.props;
		const { format, open } = this.state;

		return (
			<nav className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">Palette <span role="img" aria-label="Palette emoji" aria-labelledby="emoji">🎨</span></Link>
				</div>
				{showingAllColors &&
					<div className={classes.sliderContainer}>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} value={level} />
						</div>
					</div>}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleChangeFormat} className={classes.selectRoot}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					autoHideDuration={3000}
					message={<span id="message-id"> Format Changed To {format.toUpperCase()}!</span>}
					ContentProps={{ 'aria-describedby': "message-id" }}
					action={[
						<IconButton>
							<CloseIcon style={{ color: 'white' }} onClick={this.closeSnackbar}
								key="close" aria-label="close"
							/>
						</IconButton>
					]}
					onClose={this.closeSnackbar}
				/>
			</nav >
		)
	}
}

export default withStyles(styles)(Navbar);