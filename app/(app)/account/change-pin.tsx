import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import axios from 'axios';
import Loader from '@/components/Loader';
import BankModal from '@/components/modals/BankModal';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const edit = () => {
	const { profile, token, setProfile } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();
	const [currentPin, setCurrentPin] = useState('');
	const [newPin, setNewPin] = useState('');
	const [confirmPin, setConfirmPin] = useState('');
	const updateUser = async () => {
		try {
			if (!newPin || !confirmPin || !currentPin) {
				return Alert.alert('Pin Error', 'All pin fields are required');
			}
			if (newPin !== confirmPin) {
				return Alert.alert('Pin Error', 'New pin and confirm pin must match');
			}
			setIsLoading(true);

			const option = {
				currentPin,
				confirmPin,
				newPin,
			};
			console.log(option);
			const { data } = await axios.patch(
				`${apiUrl}/users/${profile.id}`,
				option,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (data) {
				Alert.alert('Profile updated', 'Profile updated successfully');
				console.log('data', data);
				setProfile(data);
				await AsyncStorage.setItem('userInfo', JSON.stringify(data));
				router.navigate('/(app)/profile');
			}
		} catch (error) {
			console.log(error);
			Alert.alert('Something went wrong', 'Something went wrong');
			// router.replace('/(app)');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Header title="Change Pin" />
					<View>
						<View>
							<View>
								<Text>Current Pin</Text>
								<TextInput
									placeholder="Enter current pin"
									style={{
										fontSize: 16,
										fontWeight: '500',
										color: theme.colors.text,
										paddingLeft: 48,
										paddingRight: 12,
										height: 48,
										borderRadius: 12,
										backgroundColor: theme.colors.background,
										width: '100%',
									}}
									value={currentPin}
									onChangeText={setCurrentPin}
								/>
							</View>
							<View>
								<Text>New Pin</Text>
								<TextInput
									placeholder="Enter new pin"
									style={{
										fontSize: 16,
										fontWeight: '500',
										color: theme.colors.text,
										paddingLeft: 48,
										paddingRight: 12,
										height: 48,
										borderRadius: 12,
										backgroundColor: theme.colors.background,
										width: '100%',
									}}
									value={newPin}
									onChangeText={setNewPin}
								/>
							</View>
							<View>
								<Text>Confirm Pin</Text>
								<TextInput
									placeholder="Confirm new pin"
									style={{
										fontSize: 16,
										fontWeight: '500',
										color: theme.colors.text,
										paddingLeft: 48,
										paddingRight: 12,
										height: 48,
										borderRadius: 12,
										backgroundColor: theme.colors.background,
										width: '100%',
									}}
									value={confirmPin}
									onChangeText={setConfirmPin}
								/>
							</View>
						</View>
						<Pressable
							onPress={updateUser}
							style={[
								styles.button,
								{
									backgroundColor: 'blue',
								},
							]}
						>
							<Text style={{ color: 'white' }}>Change Pin</Text>
						</Pressable>
					</View>
				</View>
			)}
		</>
	);
};
const styles = StyleSheet.create({
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
export default edit;
