import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from '../../styles/DefaultPalette/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';
import classnames from 'classnames';

class ColorBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};

		// either bind here or change declaration to changeCopyState = e = () => {} function
		// this.changeCopyState = this.changeCopyState.bind(this);
	}

	changeCopyState = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	}

	render() {

		const { background, name, showingFullPalette, history, classes } = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div className={classes.ColorBox} style={{ background }}>

					<div
						className={classnames(classes.copyOverlay, {
							[classes.showCopyOverlay]: copied
						})}
						style={{ background }}></div>
					<div
						className={classnames(classes.copyMessage, {
							[classes.showCopyMessage]: copied
						})} >
						<h1>copied!</h1>
						<p>{background}</p>
					</div>

					<div id="copy-container">
						<div className={classes.boxContent}>
							<span className={classes.colorNameColor}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>
					{showingFullPalette &&
						<Link to={`${history.location.pathname.replace(/\/$/g, '')}/${name.split(' ')[0].toLowerCase()}`} onClick={e => e.stopPropagation()}>
							<span className={classes.seeMoreButton}>more</span>
						</Link>
					}
				</div>
			</CopyToClipboard>
		);
	}
}
export default withStyles(styles)(withRouter(ColorBox));