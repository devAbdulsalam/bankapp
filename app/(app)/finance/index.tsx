import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import PrimaryButton from '@/components/PrimaryButton';
import { router } from 'expo-router';

const index = () => {
	return (
		<SafeAreaView>
			<View>
				<Header title="Account" />
				<Text>index</Text>
				<PrimaryButton
					label="View Statement"
					onPress={() => router.navigate('/finance/statement')}
				/>
			</View>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({});
