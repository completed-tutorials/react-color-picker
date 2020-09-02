import React, { Component } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { Picker as EmojiPicker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default class PaletteSaveInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stage: "form",
			newPaletteName: "",
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique',
			(value) => this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()))

	}


	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.hideForm();
	}

	showEmojiPicker = () => {
		this.setState({ stage: "emoji" });
	}

	handleSubmit = (emoji) => {
		const { newPaletteName } = this.state;
		const newPaletteInfo = {
			paletteName: newPaletteName,
			emoji: emoji.native
		}
		this.props.handleSavePalette(newPaletteInfo);
		this.setState({ stage: "" })
	}


	render() {

		const { stage, newPaletteName } = this.state;

		return (
			<div>
				<Dialog open={stage === 'emoji'} aria-labelledby="emoji-picker-dialog" onClose={this.handleClose}>
					<DialogTitle id="form-dialog-title">Choose A Palette Emoji</DialogTitle>
					<EmojiPicker title="Pick Your Emoji" onSelect={this.handleSubmit} />
				</Dialog>
				<Dialog open={stage === 'form'} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Create Your Palette</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please choose a name for your beautiful palette. Make sure it's unique <span role="img" aria-label="wink emoji">😉</span>!
          </DialogContentText>
							<TextValidator
								label="Palette Name" name="newPaletteName"
								value={newPaletteName} onChange={this.handleChange}
								fullWidth
								autoFocus
								margin="normal"
								validators={[
									'required',
									'isPaletteNameUnique'
								]}
								errorMessages={[
									"Please choose a name for your palette",
									"Another palette with this name already exists"
								]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">Cancel</Button>
							<Button variant="contained" color="primary" type="submit">Save Palette</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		)
	}
}
