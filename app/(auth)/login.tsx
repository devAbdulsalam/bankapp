import {
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	useWindowDimensions,
	Alert,
	StyleSheet,
	StatusBar,
	Text,
	Image,
	Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import { RootStackScreenProps } from '../navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
// import Artwork03 from '@/components/artworks/Artwork03';
import { LOG_IN_SCREEN } from '@/constants/Data';
import PrimaryButton from '@/components/PrimaryButton';
import Icons from '@expo/vector-icons/MaterialIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/Loader';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const LoginScreen = () => {
	const theme = useTheme();
	const { height } = useWindowDimensions();
	const [email, onChangeEmail] = useState('');
	const [password, onChangePassword] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isNewUser, setIsNewUser] = useState<boolean>(false);
	const [isError, setIsError] = useState('');
	const { session, setSesion, setToken, setProfile } = useAuth();
	useEffect(() => {
		if (session) {
			router.push('/(app)/');
		}
	});
	const checkOnboarding = async () => {
		try {
			setIsLoading(true);
			const value = await AsyncStorage.getItem('isOnboarded');
			if (value !== null) {
				// await AsyncStorage.removeItem('isOnboarded');
				// setIsNewUser(false);
				setIsNewUser(true);
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

	const clearData = () => {
		setIsError('');
		onChangeEmail('');
		onChangePassword('');
	};
	const handleLogin = async () => {
		setIsError('');
		if (!email) {
			return setIsError('Email is required');
		}
		if (!password) {
			return setIsError('Password is required');
		}
		setIsLoading(true);
		try {
			const { data } = await axios.post(`${apiUrl}/users/login`, {
				email,
				password,
			});
			if (data) {
				console.log(data);
				await AsyncStorage.setItem('accessToken', data.token);
				await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
				setSesion(data.token);
				setToken(data.token);
				setProfile(data.user);
				clearData();
				Alert.alert('Login success', 'Login successfully');
				router.replace('/(app)/');
			}

			setIsLoading(false);
		} catch (error) {
			console.warn('Error', '@post login', error);
			console.warn('Error', '@post login password', error?.message);
			// const message = error?.data || 'Something went wrong!';
			Alert.alert('Error sigining up', 'Something went wrong', [
				{
					text: 'cancel',
					onPress: () => {
						console.log('cancel');
					},
				},
				{
					text: 'ok',
					onPress: () => {
						console.log('cancel');
					},
				},
			]);
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
				>
					<SafeAreaView
						style={{
							flex: 1,
							backgroundColor: theme.colors.card,
							// minHeight: height,
						}}
					>
						<View>
							<Text>login</Text>
						</View>
					</SafeAreaView>
				</KeyboardAvoidingView>
			)}
		</>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
