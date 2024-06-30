import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { router } from 'expo-router';

const expence = () => {
	const [isChart, setIsChart] = useState(false);

	const handlePress = () => {
		setIsChart(!isChart);
	};
	return (
		<View>
			<Header title="Expense" onPress={() => router.back()} />
			<Text>expence</Text>
			<View>
				<Pressable onPress={handlePress}>
					<Text>list</Text>
				</Pressable>
				<Pressable onPress={handlePress}>
					<Text>chart</Text>
				</Pressable>
			</View>
			{isChart ? (
				<View>
					<Text>chart</Text>
				</View>
			) : (
				<View>
					<Text>List</Text>
				</View>
			)}
		</View>
	);
};

export default expence;

const styles = StyleSheet.create({});
