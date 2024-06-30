import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	FlatList,
	Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { transactions } from '@/constants/Data';
import Header from '@/components/HeaderTwo';
import { FontAwesome6, AntDesign, Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Transaction from '@/components/Transaction';
import { router } from 'expo-router';

const statement = () => {
	const theme = useTheme();
	const [from, setFrom] = useState('');
	const [toDate, setToDate] = useState('');

	const balance = 10000;
	const account = '980u098999';

	const handleDownload = () => {
		console.log('download');
	};
	const SelectAccount = () => {
		console.log('SelectAccount');
	};
	const handleSelectToDate = () => {
		console.log('handleSelectToDate');
	};
	const handleSelectFromDate = () => {
		console.log('handleSelectFromDate');
	};
	const handleSearch = () => {
		console.log('handleSearch');
		if (!from || !toDate) {
			return;
		}
		console.log('handleSearch');
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				title="Statement"
				handlePress={handleDownload}
				onPress={() => router.back()}
			/>

			<FlatList
				ListHeaderComponent={() => (
					<>
						<View style={{ paddingVertical: 10 }}>
							<View
								style={{
									padding: 10,
									margin: 16,
									backgroundColor: 'blue',
									justifyContent: 'space-between',
									shadowColor: 'blue',
									borderRadius: 10,
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										paddingVertical: 6,
									}}
								>
									<Pressable
										onPress={SelectAccount}
										style={{
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<Text style={{ color: 'white', fontWeight: '700' }}>
											savings account
										</Text>
										<Entypo name="chevron-small-down" size={24} color="white" />
									</Pressable>
									<Text style={{ color: 'white', fontWeight: '700' }}>
										Balance
									</Text>
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Text style={styles.Title}>{account}</Text>
									<Text
										style={[styles.Title, { fontWeight: 'bold', color: '' }]}
									>
										₦{balance}
									</Text>
								</View>
							</View>
							<View
								style={{
									borderColor: 'black',
									// borderWidth: 1,
									borderStyle: 'dotted',
									padding: 16,
									borderTopWidth: 1,
									borderBottomWidth: 1,
								}}
							>
								<Text style={styles.Title}>Select date</Text>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										gap: 4,
										marginTop: 5,
									}}
								>
									<Pressable onPress={handleSelectFromDate} style={styles.date}>
										<AntDesign name="calendar" size={22} color="black" />
										<Text
											style={{
												color: 'black',
												padding: 10,
												fontWeight: 'bold',
												fontSize: 20,
											}}
										>
											16 jun 2024
										</Text>
									</Pressable>
									<Pressable onPress={handleSelectToDate} style={styles.date}>
										<AntDesign name="calendar" size={22} color="black" />
										<Text
											style={{
												color: 'black',
												padding: 10,
												fontWeight: 'bold',
												fontSize: 20,
											}}
										>
											18 jun 2024
										</Text>
									</Pressable>
									<Pressable
										onPress={handleSearch}
										style={{
											padding: 10,
											backgroundColor: 'black',
											borderRadius: 10,
										}}
									>
										<Text
											style={{
												color: 'white',
												padding: 10,
												fontWeight: 'bold',
												fontSize: 20,
											}}
										>
											Go
										</Text>
									</Pressable>
								</View>
							</View>
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
					</>
				)}
				style={{ marginBottom: 20, paddingHorizontal: 15 }}
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
	Title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	date: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		borderRadius: 10,
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
	},
});
//
