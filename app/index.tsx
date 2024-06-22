import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import PrimaryButton from '@/components/PrimaryButton';

const index = () => {
	const [isLoading, setIsLoading] = useState(false);

	const theme = useTheme();
	const checkOnboarding = async () => {
		try {
			setIsLoading(true);
			const value = await AsyncStorage.getItem('isOnboarded');
			if (value !== null) {
				router.replace('/(auth)/login');
			}
		} catch (e) {
			console.log('Error @checkOnbaording', e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkOnboarding();
	}, []);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeAreaView style={{ backgroundColor: theme.colors.card, flex: 1 }}>
					<View>
						<Text>index</Text>
						<PrimaryButton
							label="Get started"
							onPress={() => router.replace('/(app)/')}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default index;

const styles = StyleSheet.create({});
