
import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

// Material UI components
import {
	Drawer,
	Typography,
	Divider,
	IconButton,
	Button,
} from '@material-ui/core';

// Material UI icons
import {
	ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

// utilities
import arrayMove from 'array-move';

// Components 
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

import styles from '../../styles/CustomPalette/NewPaletteFormStyles';
import seedColors from '../../assets/seedColors';

function NewPaletteForm(props) {

	const [open, setOpen] = useState(false);
	const [state, setState] = useState({
		colors: seedColors[0].colors
	});

	const { colors } = state;
	const { maxColors, classes, palettes } = props;
	const paletteIsFull = colors.length === maxColors;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addNewColor = (newColor) => {
		const colors = [...state.colors, newColor];
		setState({ ...state, colors });
	};

	const addRandomColor = () => {
		// TODO make sure an existing color isn't generated
		const allColors = props.palettes.map(pal => pal.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		let randomColor = allColors[rand];
		let isDuplicateColor = true
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length)
			randomColor = allColors[rand]
			isDuplicateColor = state.colors.some(color => color.name === randomColor.name)
		}
		setState({ ...state, colors: [...colors, randomColor] });
	}

	const deleteColor = (colorName) => {
		const colors = state.colors.filter(color => color.name !== colorName)
		setState({ ...state, colors });
	};

	const clearColors = () => {
		setState({ ...state, colors: [] });
	}



	const onSortEnd = ({ oldIndex, newIndex }) => {
		const colors = arrayMove(state.colors, oldIndex, newIndex)
		setState({ ...state, colors });
	}


	const handleSavePalette = (newPaletteInfo) => {

		const { savePalette, history } = props;

		newPaletteInfo.id = newPaletteInfo.paletteName.replace(/ /g, '-').toLowerCase();
		newPaletteInfo.colors = state.colors;
		savePalette(newPaletteInfo);
		history.push('/');
	};


	return (
		<div className={classes.root}>
			<PaletteFormNav open={open} palettes={palettes}
				handleSavePalette={handleSavePalette}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>

				<Divider />

				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>Design Your Palette</Typography>
					<div className={classes.buttons}>
						<Button className={classes.button} variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
						<Button className={classes.button} variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
							{paletteIsFull ? "Palette Full" : "Random Color"}
						</Button>
					</div>

					<ColorPickerForm
						colors={colors}
						paletteIsFull={paletteIsFull}
						handleAddColor={addNewColor} />
				</div>

			</Drawer>

			<main className={clsx(classes.content, { [classes.contentShift]: open, })}>
				<div className={classes.drawerHeader} />
				<DraggableColorList
					colors={state.colors}
					deleteColor={deleteColor}
					axis="xy"
					distance={20}
					onSortEnd={onSortEnd}
				/>
			</main>
		</div>
	);
}

NewPaletteForm.defaultProps = {
	maxColors: 20
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);