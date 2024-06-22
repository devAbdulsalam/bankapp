import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

type headerProps = {
	title: string;
};

const Header = ({ title }: headerProps) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 4,
				paddingTop: StatusBar.currentHeight,
				padding: 10,
				backgroundColor: 'white',
			}}
		>
			<Pressable onPress={() => router.back()} style={styles.Icon}>
				<FontAwesome6 name="arrow-left-long" size={20} color="black" />
			</Pressable>
			<Text style={styles.Title}>{title}</Text>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	Title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	Icon: {
		padding: 10,
		borderRadius: 28,
		// backgroundColor: '#D0D0D0',
	},
});
