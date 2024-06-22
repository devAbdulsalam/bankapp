import { StyleSheet, Text, SafeAreaView, View, FlatList } from 'react-native';
import React from 'react';
import { transactions } from '@/constants/Data';
import Header from '@/components/Header';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Transaction from '@/components/Transaction';

const statement = () => {
	const theme = useTheme();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View>
				<Header title="Statement" />
				<FontAwesome6 name="download" size={24} color={theme.colors.primary} />
			</View>

			<View style={{ paddingVertical: 200 }}>
				<Text style={styles.Header}>Balance</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingVertical: 5,
				}}
			>
				<Text style={styles.Header}>Transactions</Text>
			</View>
			<FlatList
				style={{ marginBottom: 20 }}
				data={transactions}
				renderItem={({ item }) => <Transaction item={item} />}
			/>
		</SafeAreaView>
	);
};

export default statement;

const styles = StyleSheet.create({
	Header: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
