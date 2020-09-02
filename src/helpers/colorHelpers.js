import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
	let newPalette = {
		// paletteName: starterPalette.paletteName,
		// id: starterPalette.id,
		// emoji: starterPalette.emoji,
		...starterPalette,
		colors: {}
	};

	// add a level label for each level in the levels array
	levels.forEach(level => newPalette.colors[level] = []);

	// for each color in the palette
	starterPalette.colors.forEach(color => {

		// generate a scale for that color
		let scale = generateScale(color.color, 10).reverse();

		// for each level of color generated for the main color push it to its corresponding color level array
		scale.forEach((s, i) => newPalette.colors[levels[i]].push({
			name: `${color.name} ${levels[i]}`,
			id: color.name.toLowerCase().replace(/ /g, '-'),
			hex: s,
			rgb: chroma(s).css(),
			rgba: chroma(s).css().replace('rgb', 'rgba').replace(')', ',1.0)'),
		})
		);
	});

	return newPalette;
}

// Get the range of colors => darkened ourColor -> ourColor -> white
function getRange(hexColor) {
	const end = '#fff';

	return [
		chroma(hexColor).darken(1.4).hex(),
		hexColor,
		end
	]
}

function generateScale(hexColor, numColors) {
	return chroma.scale(getRange(hexColor)).mode("lab").colors(numColors);
}

export { generatePalette };