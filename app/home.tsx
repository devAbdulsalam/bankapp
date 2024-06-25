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
import { getAxiosError } from '@/hooks/getError';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import Svg01 from '@/components/svgIcons';
import axios from 'axios';
import { useAuth } from '@/context/authContext';

const index = () => {
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();
	const { logout } = useAuth();

	const fetchSession = async () => {
		try {
			setIsLoading(true);
			const accessToken = await AsyncStorage.getItem('accessToken');
			if (accessToken === null || accessToken === '') {
				return router.replace('/(auth)/login');
			}
			const { data } = await axios.post(`${apiUrl}/users/refresh-token`, {});
			if (data) {
				// console.log('refresh', data);
				await AsyncStorage.setItem('accessToken', data.accessToken);
				// 	await AsyncStorage.getItem('refreshToken', data.refreshToken);
				return router.replace('/(app)/');
			}
		} catch (e) {
			const message = await getAxiosError(e);
			if (message === 'Refresh token is expired or used') {
				await logout();
				router.replace('/(auth)/login');
				return;
			}
			console.log('Error @checkOnbaording', message);
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
						colors={['lightblue', '#fffad0c4', 'white', 'lightblue']}
						// colors={['lightblue', 'blue', 'white', '#ffff9a9e', '#fffad0c4']}
						style={{ flex: 1, width: '100%' }}
						start={{ x: 0.5, y: 0.2 }}
						end={{ x: 1, y: 1 }}
						locations={[0, 0.5, 1, 0.6]}
					>
						<View style={styles.container}>
							{/* <Image
								source={images.savings}
								style={styles.image}
								resizeMode="contain"
							/> */}
							<Svg01 width={240} height={240} />
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
		color: 'blue',
		fontSize: 30,
		fontWeight: 'bold',
	},
});
