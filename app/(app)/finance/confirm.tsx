import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';

const confirm = () => {
	return (
		<View>
			<Text>confirm</Text>
			<PrimaryButton label="Trasfer now" />
		</View>
	);
};

export default confirm;

const styles = StyleSheet.create({});
