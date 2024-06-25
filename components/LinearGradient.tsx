import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const START_DEFAULT = { x: 0.5, y: 0 };
const END_DEFAULT = { x: 0.5, y: 1 };
// const START_HORIZONTAL = { x: 0, y: 0.5 };
// const END_HORIZONTAL = { x: 1, y: 0.5 };
const GRADIENT_COLORS = [
	'#fdf4c9',
	'#fbcdf2',
	'#e8befa',
	'#acbfff',
	'#bbf3bf',
	'#fdf4c9',
	'#fbcdf2',
];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout = undefined;

const Index = (children: any) => {
	let [gradientOptions, setGradientOptions] = React.useState({
		colors: GRADIENT_COLORS,
		locations: GRADIENT_LOCATIONS,
		start: START_DEFAULT,
		end: END_DEFAULT,
	});
	// const gradientOptionsRef = React.useRef(gradientOptions);
	return (
		<LinearGradient
			style={styles.container}
			colors={gradientOptions.colors}
			locations={gradientOptions.locations}
			start={gradientOptions.start}
			end={gradientOptions.end}
		>
			{children}
		</LinearGradient>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default Index;
