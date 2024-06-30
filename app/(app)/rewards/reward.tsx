import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { router } from 'expo-router';

const index = () => {
	return (
		<View>
			<Header title="Reward" onPress={() => router.back()} />
			<Text>Reward</Text>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({});
