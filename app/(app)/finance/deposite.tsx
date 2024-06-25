import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import Header from '@/components/Header';
import axios from 'axios';
// import Loader from '@/components/Loader';
import Loader from '@/components/modals/Loader';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchBanks, verifyAccount } from '@/api';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const confirm = () => {
	const { profile, token } = useAuth();
	const theme = useTheme();
	const [amount, setAmount] = useState(0);
	const [remark, setRemark] = useState('');
	return (
		<View>
			<Header title="Deposite money" />
			<View>
				<Text>Amount</Text>
				<View>
					<TextInput
						placeholder="Your Amoumt"
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
						value={amount}
						onChangeText={setAmount}
					/>
				</View>
			</View>
			<View>
				<Text>Remark</Text>
				<View>
					<TextInput
						placeholder="Your Remark"
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
						value={remark}
						multiline
						onChangeText={setRemark}
					/>
				</View>
			</View>
			<PrimaryButton label="Trasfer now" />
		</View>
	);
};

export default confirm;

const styles = StyleSheet.create({});
