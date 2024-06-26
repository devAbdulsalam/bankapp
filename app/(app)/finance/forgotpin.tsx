import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import Header from '@/components/Header';
import axios from 'axios';
// import Loader from '@/components/Loader';
import Loader from '@/components/modals/Loading';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const forgotpin = () => {
	const { profile, token } = useAuth();
	const handlePress = () => {};
	return (
		<View>
			<Header title="Forgot Pin" onPress={() => router.back()} />
			<View>
				<Text>Input the verification code sent to {profile.phone}</Text>
				<Pressable onPress={() => router.navigate('/cutomer-service')}>
					<Text>or chat Customer care</Text>
				</Pressable>

				<Text>Enter verification code:</Text>
				<Pressable onPress={handlePress}>
					<AntDesign name="message1" size={24} color="black" />
					<Text>Send SMS</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default forgotpin;

const styles = StyleSheet.create({});
