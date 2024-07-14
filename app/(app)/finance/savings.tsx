import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { router } from 'expo-router';

const savings = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				title="Savings"
				// handlePress={handleDownload}
				onPress={() => router.back()}
			/>
			<View>
				<Text>savings</Text>
			</View>
		</SafeAreaView>
	);
};

export default savings;

const styles = StyleSheet.create({});
