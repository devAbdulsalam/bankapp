import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import Header from '@/components/Header';

const updatePassword = () => {
	return (
		<View>
			<Header title="Update password" onPress={() => router.back()} />
			<Text>update-password</Text>
			<Link href={'/otp'}>otp</Link>
		</View>
	);
};

const styles = StyleSheet.create({});

export default updatePassword;
