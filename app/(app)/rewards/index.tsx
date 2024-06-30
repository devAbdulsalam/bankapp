import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { router } from 'expo-router';

const index = () => {
	return (
		<View>
			<Header title="Reward" onPress={() => router.back()} />
			<View style={styles.container}>
				<Text>Reward</Text>
			</View>
		</View>
	);
};

export default index;


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#AAD3FF',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginBottom: 20,
	},
});
