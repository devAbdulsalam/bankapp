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
import Loader from '@/components/Loader';
import BankModal from '@/components/modals/BankModal';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchBanks, verifyAccount } from '@/api';
import Header from '@/components/Header';
import { router } from 'expo-router';
import { getAxiosError } from '@/hooks/getError';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const transfer = () => {
	const { profile, token } = useAuth();
	const theme = useTheme();
	const { data } = useQuery({
		queryKey: ['banks'],
		queryFn: () => fetchBanks(token),
	});
	const [accountNumber, setAccountNumber] = useState('');
	const [accountName, setAccountName] = useState('');
	const [bank, setBank] = useState('');
	const [showBankModal, setShowBankModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState('');

	const handelSelectBank = async (item: any) => {
		try {
			setBank(() => item);
			setShowBankModal(false);
			if (!accountNumber) {
				return setIsError('Invalid Account Number');
			}
			const data = {
				accountNumber,
				bank,
			};
			const checkAccount = await verifyAccount(data);

			console.log(checkAccount);
			setAccountName('checkAccount');
		} catch (error) {
			console.warn('Error', '@post forgot password', { ...error });
			const message = await getAxiosError(error);
			Alert.alert('Error sigining up', message, [
				{ text: 'OK', onPress: () => {} },
			]);
		}
	};

	const handleTransfer = async () => {
		try {
			if (!accountNumber) {
				return setIsError('Invalid Account Number');
			}
			const data = {
				accountName,
				accountNumber,
				bank,
			};

			router.navigate('/finance/confirm-transfer', data);
		} catch (error) {}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Header title="Transfer Money" />
					<View style={{ padding: 10 }}>
						<View style={{ marginBottom: 5 }}>
							<Text
								style={{ fontSize: 18, fontWeight: 'semibold', padding: 5 }}
							>
								Account number
							</Text>
							<View>
								<TextInput
									placeholder="Enter Account Number"
									style={{
										fontSize: 16,
										fontWeight: '500',
										color: theme.colors.text,
										paddingLeft: 12,
										paddingRight: 12,
										height: 48,
										borderRadius: 12,
										backgroundColor: 'white',
										width: '100%',
									}}
									value={accountNumber}
									onChangeText={setAccountNumber}
								/>
							</View>
							{isError && (
								<Text style={{ color: 'red', fontSize: 10, padding: 5 }}>
									{isError}
								</Text>
							)}
						</View>
						<View>
							<Text
								style={{ fontSize: 18, fontWeight: 'semibold', padding: 5 }}
							>
								Select bank
							</Text>
							<Pressable
								onPress={() => setShowBankModal(true)}
								style={{
									padding: 10,
									borderRadius: 10,
									backgroundColor: 'white',
								}}
							>
								<Text style={{ color: theme.colors.text }}>{bank}</Text>
							</Pressable>
						</View>
						{accountName && (
							<View style={{ marginTop: 5 }}>
								<Text
									style={{ fontSize: 18, fontWeight: 'semibold', padding: 5 }}
								>
									Account Name
								</Text>
								<View
									style={{
										padding: 10,
										borderRadius: 10,
										backgroundColor: 'white',
									}}
								>
									<Text style={{ color: theme.colors.text }}>
										{accountName}
									</Text>
								</View>
							</View>
						)}

						{!accountName ? (
							<Pressable
								// onPress={() => handlePress(item)}
								style={[
									styles.button,
									{
										backgroundColor: theme.colors.background,
										borderColor: 'gray',
									},
								]}
							>
								<Text style={[styles.text, { color: theme.colors.text }]}>
									Transfer now
								</Text>
							</Pressable>
						) : (
							<PrimaryButton label="Transfer now" onPress={handleTransfer} />
						)}
					</View>
				</View>
			)}
			{showBankModal && (
				<BankModal
					handlePress={handelSelectBank}
					isModal={showBankModal}
					setIsModal={setShowBankModal}
					banks={data}
				/>
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
export default transfer;
