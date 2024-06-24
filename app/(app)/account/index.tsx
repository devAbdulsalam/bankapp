import React from 'react';
import {
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
	Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '@/components/Loader';
import BankModal from '@/components/modals/BankModal';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchBanks } from '@/api';

// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const Index = () => {
	// const { profile, token } = useAuth();
	const theme = useTheme();
	const { profile, setProfile, setSesion, setToken } = useAuth();
	const logout = async () => {
		await AsyncStorage.removeItem('accessToken');
		await AsyncStorage.removeItem('userInfo');
		await AsyncStorage.removeItem('refreshToken');
		await AsyncStorage.removeItem('isAppFirstLaunched');
		setToken(null);
		setSesion(null);
		setProfile(null);
		router.navigate('/');
	};
	const handleLogout = () => {
		Alert.alert('Are you sure?', 'You will be logout', [
			{
				text: 'cancel',
				onPress: () => {
					console.log('cancel');
				},
			},
			{
				text: 'ok',
				onPress: logout,
			},
		]);
	};
	return (
		<View style={styles.header}>
			<View
				style={{
					justifyContent: 'space-between',
					flexDirection: 'row',
					backgroundColor: 'white',
					padding: 15,
				}}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Pressable
						onPress={() => router.navigate('/account/edit')}
						style={{
							padding: 10,
						}}
					>
						<Image
							source={{
								uri:
									profile?.avatar?.url ||
									`https://ui-avatars.com/api/?name=${profile?.firstName}`,
							}}
							style={{
								height: 48,
								width: 48,
								borderRadius: 24,
								borderWidth: 1,
								// borderColor: COLORS.secondary,
							}}
						/>
					</Pressable>
					<View style={{ marginLeft: 10 }}>
						<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
							{profile?.firstName} {profile?.lastName}
						</Text>
						<Text style={{ fontSize: 14, color: 'gray' }}>
							{profile?.email}
						</Text>
					</View>
				</View>
				<Pressable
					onPress={() => router.push('/(app)/account/edit')}
					style={{
						paddingHorizontal: 10,
						paddingVertical: 12,
						borderRadius: 10,
					}}
				>
					<FontAwesome name="edit" size={18} color={theme.colors.text} />
				</Pressable>
			</View>

			<Pressable
				onPress={handleLogout}
				style={{
					justifyContent: 'center',
					backgroundColor: 'red',
					flexDirection: 'row',
					padding: 15,
					borderRadius: 10,
				}}
			>
				<Text style={styles.text}>Log out</Text>
			</Pressable>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	header: {
		width: '100%',
		paddingTop: StatusBar.currentHeight,
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		borderRadius: 8,
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
});
