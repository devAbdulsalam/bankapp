import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loader = () => {
	return (
		<View style={styles.container}>
			<View>
				<ActivityIndicator size="large" color="blue" />
				<Text style={{ color: 'blue' }}>Loading ...</Text>
			</View>
		</View>
	);
};

export default Loader;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});
