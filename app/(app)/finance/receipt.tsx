import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const receipt = () => {
	const theme = useTheme();
	return (
		<View>
			<View>
				<View style={{ backgroundColor: 'green' }}>
					<Ionicons name="checkmark-circle" size={45} color="white" />
				</View>
				<View>
					<Text style={styles.Title}>Transfer successfully</Text>
					<Text style={styles.text}>date jdkdjkd</Text>
				</View>
			</View>
			<View style={styles.card}>
				<View style={styles.card}>
					<Text style={styles.Text}>From</Text>
					<Text style={styles.text}> khsijsdslklskls</Text>
					<Text style={styles.Text}>Amount</Text>
					<Text style={styles.text}>3030</Text>
				</View>
				<View style={styles.card}>
					<Text style={styles.Text}>Remark</Text>
					<Text style={styles.text}>Remark khsijsdslklskls</Text>
				</View>
			</View>
			<Pressable
				onPress={() => router.replace('/')}
				style={[styles.button, { backgroundColor: theme.colors.background }]}
			>
				<Text style={[styles.text, { color: theme.colors.text }]}>
					Back to home
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#F5F5F5',
		paddingHorizontal: 16,

		// paddingTop: StatusBar.currentHeight,
	},
	card: {
		borderRadius: 8,
		backgroundColor: 'white',
		shadowColor: 'white',
		marginVertical: 5,
		padding: 10,
		elevation: 5,
		shadowOpacity: 0.8,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 20,
		},
	},
	Title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	Icon: {
		padding: 10,
		borderRadius: 28,
		backgroundColor: '#D0D0D0',
	},
	Text: {
		fontSize: 16,
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		borderRadius: 8,
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
});

export default receipt;
