import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

type transactionProps = {
	item: {
		name: string;
		amount: number | string;
		id: number;
		type: string;
		description: string | null;
	};
};
const Transaction = ({ item }: transactionProps) => {
	const theme = useTheme();
	return (
		<View key={item.id} style={styles.transaction}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
				<View style={styles.transactionIcon}>
					<FontAwesome6
						name="arrow-right-arrow-left"
						size={24}
						color={item.name === 'Current' ? theme.colors.primary : 'black'}
					/>
				</View>
				<View>
					<Text style={styles.transactionTitle}>{item.name}</Text>
					<Text style={styles.transactionText}>Banking</Text>
				</View>
			</View>
			<Text
				style={{
					...styles.transactionTitle,
					color: item.type === 'Deposit' ? 'green' : 'red',
				}}
			>
				{item.type === 'Deposite' ? `-${item.amount}` : `+${item.amount}`}
			</Text>
		</View>
	);
};

export default Transaction;

const styles = StyleSheet.create({
	transaction: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		backgroundColor: 'white',
		shadowColor: 'white',
		marginVertical: 5,
		padding: 5,
	},
	transactionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	transactionIcon: {
		padding: 10,
		borderRadius: 28,
		backgroundColor: '#D0D0D0',
	},
	transactionText: {
		fontSize: 16,
	},
});
