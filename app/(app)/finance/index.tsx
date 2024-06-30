import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import PrimaryButton from '@/components/PrimaryButton';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

const index = () => {
	const theme = useTheme();
	return (
		<SafeAreaView>
			<View>
				<Header title="Account" onPress={() => router.back()} />
				<View
					style={[
						styles.balanceCard,
						{ width: '100%', backgroundColor: theme.colors.primary },
					]}
				>
					<Text style={styles.balanceText}>
						Total Balance:
						<Text style={styles.balanceAmount}> ₦34344</Text>
					</Text>
					<View>
						<View>
							<Text style={styles.AccountText}>Savings account</Text>
							<Text style={styles.AccountText}>A/c no 8989898989</Text>
						</View>
					</View>
				</View>
				<PrimaryButton
					label="View Statement"
					onPress={() => router.navigate('/finance/statement')}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 10,
		borderRadius: 24,
		flex: 1,
	},
	balanceCard: {
		// width: '100%',
		gap: 4,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 18,
		paddingVertical: 16,
		backgroundColor: 'blue',
		shadowColor: 'blue',
		elevation: 5,
		shadowOpacity: 0.8,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 20,
		},
	},
	balanceText: {
		color: 'white',
		fontSize: 20,
		marginVertical: 12,
	},
	balanceAmount: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
	},
	AccountText: {
		color: 'white',
	},
});
export default index;
