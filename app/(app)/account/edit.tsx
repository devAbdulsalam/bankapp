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
	const [firstName, setFirstName] = useState(profile.firstName);
	const [lastName, setLastName] = useState(profile.LastName);
	const [email, setEmail] = useState(profile.email);
	const [phone, setPhone] = useState(profile.phone);
	const updateUser = async () => {
		try {
			setIsLoading(true);

			const option = {
				lastName,
				firstName,
				email,
				phone,
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
					<Header title="Edit profile" />
					<View>
						<View>
							<View>
								<Text>First Name</Text>
								<TextInput
									placeholder="Your username"
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
									value={firstName}
									onChangeText={setFirstName}
								/>
							</View>
							<View>
								<TextInput
									placeholder="Your Email"
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
									value={phone}
									onChangeText={setPhone}
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
							<Text style={{ color: 'white' }}>Update profile</Text>
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
