import { StyleSheet, Text, SafeAreaView, View, FlatList } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { router } from 'expo-router';
import { savingsData } from '@/constants/Data';

const explore = () => {
	return (
		<SafeAreaView>
			<Header title="Savings" onPress={() => router.back()} />
			<Text>Savings</Text>
			<FlatList
				data={savingsData}
				renderItem={({ item }) => (
					<View
						key={item.id}
						style={{ padding: 10, borderWidth: 1, borderColor: 'gray' }}
					>
						<Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
						{/* <Text>{item.description}</Text> */}
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default explore;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'ghostwhite',
	},
});
