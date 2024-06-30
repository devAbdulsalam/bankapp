import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { calculatePercentage } from '@/hooks';

const receipt = () => {
	const theme = useTheme();
	const { accountName, accountNumber, amount, remark, date, isSavePercentage } =
		useLocalSearchParams();
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<View
					style={{
						marginVertical: 20,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Ionicons name="checkmark-circle" size={96} color="green" />
				</View>
				<View style={{ marginBottom: 20 }}>
					<Text style={styles.Title}>Transfer successfully</Text>
					<Text style={[styles.text, { textAlign: 'center' }]}>
						{dayjs(date).format('L LT')}
					</Text>
				</View>
				<View>
					<View style={styles.textcard}>
						<Text style={styles.Text}>
							To : <Text style={styles.text}>{accountName}</Text>
						</Text>
					</View>
					<View style={styles.textcard}>
						<Text style={styles.Text}>
							Account Number: <Text style={styles.text}>{accountNumber}</Text>
						</Text>
					</View>
					<View style={styles.textcard}>
						<Text style={styles.Text}>
							Amount
							<Text style={styles.text}> : ₦{amount}</Text>
						</Text>
					</View>
					{isSavePercentage && (
						<View>
							<Text style={styles.Text}>Saved:</Text>
							<Text style={styles.text}>You saved ₦{calculatePercentage(amount)}</Text>
						</View>
					)}
					{remark && (
						<View>
							<Text style={styles.Text}>Remark:</Text>
							<Text style={styles.text}>{remark}</Text>
						</View>
					)}
				</View>
			</View>
			<Pressable
				onPress={() => router.replace('/(app)/')}
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
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		// paddingTop: StatusBar.currentHeight,
	},
	card: {
		width: '100%',
		borderRadius: 8,
		backgroundColor: 'white',
		// shadowColor: 'white',
		marginVertical: 5,
		padding: 20,
		// paddingBottom: 20,
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
		textAlign: 'center',
	},
	Icon: {
		padding: 10,
		borderRadius: 28,
		backgroundColor: '#D0D0D0',
	},
	textcard: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	Text: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	button: {
		width: '100%',
		marginVertical: 16,
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		borderRadius: 8,
		elevation: 2,
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 10,
		},
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		// color: 'white',
		// ',
	},
});

export default receipt;
