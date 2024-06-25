import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { transactions } from '@/constants/Data';
import { FontAwesome } from '@expo/vector-icons';
import Header from '@/components/Header';
import ListItem from './../../components/Notification';
import { router } from 'expo-router';

const notifications = () => {
	const [data, setData] = useState(transactions);

	const handleDeleteItem = (id) => {
		const updatedData = data.filter((item) => item.id !== id);
		setData(updatedData);
	};

	const renderItem = ({ item }) => (
		<ListItem item={item} onDelete={handleDeleteItem} />
	);

	{
		/* <View style={styles.card}>
	<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
		<View style={styles.Icon}>
			<FontAwesome name="bell-o" size={18} color="black" />
		</View>
		<Text style={styles.Title}>{item.name}</Text>
	</View>
	<Text style={styles.Text}>{item.description}</Text>
	<Text
		style={{
			...styles.Text,
			opacity: 0.2,
			borderTopColor: 'grey',
			borderTopWidth: 1,
		}}
	>
		{item.amount}
	</Text>
</View>; */
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title="Notifications" onPress={() => router.back()} />
			{/* <View style={styles.container}> */}
			<FlatList
				// ListHeaderComponent={}
				data={transactions}
				renderItem={renderItem}
				ListEmptyComponent={() => (
					<View>
						<Text>No Notification</Text>
					</View>
				)}
			/>
			{/* </View> */}
		</SafeAreaView>
	);
};

export default notifications;

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
});
