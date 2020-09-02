import React, { Component } from 'react';

// Material UI components
import {
	Button,
	Checkbox,
	FormControlLabel
} from '@material-ui/core';

// utilities
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/CustomPalette/ColorPickerFormStyles';

class ColorPickerForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newColor: {
				hex: 'teal'
			},
			defaultNameChecked: false,
			newColorName: 'color-00ffff',
		}
	}

	componentDidMount() {

		if (!this.state.defaultNameChecked)
			this.setState({ newColorName: '' });

		ValidatorForm.addValidationRule('isColorNameUnique',
			(value) => this.props.colors.every(
				({ name }) => {
					return name.toLowerCase() !== value.toLowerCase()
				}
			));

		ValidatorForm.addValidationRule('isColorUnique',
			(value) => this.props.colors.every(({ color }) => color !== this.state.newColor.hex));
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}


	handleChecked = () => {
		const { defaultNameChecked, newColorName, newColor } = this.state;
		const _defaultNameChecked = !defaultNameChecked;
		const _newColorName = _defaultNameChecked ? `color-${newColor.hex.replace('#', '')}` : newColorName;
		this.setState({ defaultNameChecked: _defaultNameChecked, newColorName: _newColorName });
	}

	handleChangeColor = (newColor) => {
		const { defaultNameChecked, newColorName } = this.state;
		const _newColorName = defaultNameChecked ? `color-${newColor.hex.replace('#', '')}` : newColorName;
		this.setState({ newColor, newColorName: _newColorName });
	};

	handleSubmit = () => {
		const { newColor, newColorName, defaultNameChecked } = this.state;
		const newColorObj = {
			name: newColorName,
			color: newColor.hex
		};
		this.props.handleAddColor(newColorObj);

		if (!defaultNameChecked) this.setState({ newColorName: "" });
	}

	render() {

		const { paletteIsFull, classes } = this.props;
		const { newColor, newColorName, defaultNameChecked } = this.state;


		return (
			<div>
				<ChromePicker className={classes.picker}
					color={newColor}
					onChange={(newColor) => this.handleChangeColor(newColor)} />

				<ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
					<TextValidator
						name="newColorName"
						placeholder="Color Name"
						value={newColorName}
						className={classes.colorNameInput}
						variant="filled"
						margin="normal"
						onChange={this.handleChange}
						validators={[
							'required',
							'isColorNameUnique',
							'isColorUnique'
						]}
						errorMessages={[
							'Please choose a name for your color',
							'Another Color with this name already exists',
							'Color already added to palette'
						]}
					/>
					<Button variant="contained" color="primary"
						className={`${classes.noDelay} ${classes.addColor}`}
						style={{ backgroundColor: paletteIsFull ? "grey" : newColor.hex }}
						type="submit"
						disabled={paletteIsFull}
					>
						{paletteIsFull ? "Palette Full" : "Add Color"}
					</Button>
				</ValidatorForm>
				<FormControlLabel
					control={
						<Checkbox
							checked={defaultNameChecked}
							value="default color name"
							onClick={this.handleChecked}
							inputProps={{ 'aria-label': 'HEX code as default name' }}
						/>
					}
					label="use HEX code as default color name"
				/>
			</div>
		)
	}
}

export default withStyles(styles)(ColorPickerForm);