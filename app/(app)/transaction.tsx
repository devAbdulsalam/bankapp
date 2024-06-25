import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '@/components/Header';

const transaction = () => {
	return (
		<SafeAreaView>
			<Header title="Transactions" onPress={() => router.back()} />
			<View>
				<Text>transaction</Text>
			</View>
		</SafeAreaView>
	);
};

export default transaction;

const styles = StyleSheet.create({});
