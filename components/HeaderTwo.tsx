import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';

type headerProps = {
	title: string;
	onPress: () => void;
	handlePress: () => void;
};

const Header = ({
	title,
	handlePress,
	onPress = () => router.back(),
}: headerProps) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 4,
				paddingTop: StatusBar.currentHeight,
				padding: 10,
				backgroundColor: 'white',
				justifyContent: 'space-between',
				shadowColor: 'blue',
				elevation: 5,
				shadowOpacity: 0.8,
				shadowRadius: 10,
				shadowOffset: {
					width: 0,
					height: 20,
				},
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Pressable onPress={onPress} style={styles.Icon}>
					<FontAwesome6 name="arrow-left-long" size={20} color="black" />
				</Pressable>
				<Text style={styles.Title}>{title}</Text>
			</View>
			<Pressable
				onPress={handlePress}
				style={[styles.Icon, { paddingRight: 8 }]}
			>
				<AntDesign name="download" size={22} color="black" />
			</Pressable>
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
