import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
import Header from '@/components/Header';

const explore = () => {
	return (
		<SafeAreaView>
			<Header title="Expore" />
			<Text>explore</Text>
		</SafeAreaView>
	);
};

export default explore;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'ghostwhite'
	}
});
