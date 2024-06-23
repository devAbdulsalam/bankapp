import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import PrimaryButton from '@/components/PrimaryButton';
import { LinearGradient } from 'expo-linear-gradient';
import images from '@/constants/Images';

const index = () => {
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();

	const fetchSession = async () => {
		try {
			setIsLoading(true);
			const accessToken = await AsyncStorage.getItem('accessToken');
			if (accessToken === null || accessToken === '') {
				return router.replace('/(auth)/login');
			}
			// 	if (accessToken) {
			// 		const userinfo = await AsyncStorage.getItem('userInfo');
			// 		const user = JSON.parse(userinfo);
			// 		if (user?.role === 'ADMIN') {
			// 			AsyncStorage.setItem('isAdmin', 'true');
			// 		}
			//   }
			// const accessToken = await AsyncStorage.getItem('accessToken');
		} catch (e) {
			console.log('Error @checkOnbaording', e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSession();
	}, []);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<SafeAreaView style={{ backgroundColor: theme.colors.card, flex: 1 }}>
					<LinearGradient
						colors={['blue', 'white', 'white', 'white']}
						style={{ flex: 1, width: '100%' }}
					>
						<View style={styles.container}>
							<Image
								source={images.savings}
								style={styles.image}
								resizeMode="contain"
							/>
							<Animated.Text style={styles.text}>
								Healthy, Wealthy, Together
							</Animated.Text>
						</View>
						<View
							style={{
								marginHorizontal: 10,
								marginTop: 'auto',
								marginBottom: 10,
							}}
						>
							<PrimaryButton
								label="Get started"
								onPress={() => router.replace('/(app)/')}
							/>
						</View>
					</LinearGradient>
				</SafeAreaView>
			)}
		</>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '70%',
		aspectRatio: 1,
		maxHeight: 700,
		maxWidth: 400,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
	text: {
		color: 'white',
	},
});
