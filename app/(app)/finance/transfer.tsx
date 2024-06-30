import React, { useEffect, useState, useCallback } from 'react';
import {
	Alert,
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@react-navigation/native';
import { useAuth } from '@/context/authContext';
import { fetchBanks, verifyAccount } from '@/api';
import PrimaryButton from '@/components/PrimaryButton';
import Loader from '@/components/modals/Loading';
import BankModal from '@/components/modals/BankModal';
import Header from '@/components/Header';
import { router } from 'expo-router';
import { getAxiosError } from '@/hooks/getError';

const Transfer = () => {
	const { profile, token } = useAuth();
	const theme = useTheme();
	const { data: banks } = useQuery({
		queryKey: ['banks'],
		queryFn: () => fetchBanks(token),
	});
	const [accountNumber, setAccountNumber] = useState('');
	const [accountName, setAccountName] = useState('');
	const [selectedBank, setSelectedBank] = useState(null);
	const [showBankModal, setShowBankModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState('');

	const checkAccount = useCallback(async () => {
		// return if account number is not 10 digits or bank is not selected.
		if (accountNumber.length !== 10 || !selectedBank) {
			setAccountName('');
			return;
		}
		setIsError('');
		const data = { account: accountNumber, bank: selectedBank.code };

		try {
			setIsLoading(true);
			const checkAccountResponse = await verifyAccount(data);
			setIsLoading(false);

			if (!checkAccountResponse.accountName) {
				setIsError('Check Account number or bank details');
			} else {
				setAccountName(checkAccountResponse.accountName);
			}
		} catch (error) {
			setIsLoading(false);
			const message = await getAxiosError(error);
			console.warn(message);
			// Alert.alert('Error verifying account', message);
		}
	}, [accountNumber, selectedBank]);

	useEffect(() => {
		checkAccount();
	}, [accountNumber, selectedBank]);

	const handleSelectBank = (item) => {
		setSelectedBank(item);
		setShowBankModal(false);
	};

	const handleTransfer = async () => {
		if (!accountNumber || !accountName || !selectedBank) {
			setIsError('Invalid Receipiant Account');
			return;
		}
		try {
			router.navigate({
				pathname: '/finance/confirm-transfer',
				params: {
					accountName,
					accountNumber,
					bankCode: selectedBank?.code,
					bankName: selectedBank?.name,
					bankImage: selectedBank?.logo,
				},
			});
		} catch (error) {
			const message = await getAxiosError(error);
			Alert.alert('Error transferring money', message);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader isModal={isLoading} setIsModal={setIsLoading} />
			) : (
				<View>
					<Header title="Transfer Money" />
					<View style={styles.container}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Account number</Text>
							<TextInput
								placeholder="Enter Account Number"
								style={[
									styles.input,
									{
										color: theme.colors.text,
										backgroundColor: 'white',
									},
								]}
								value={accountNumber}
								onChangeText={setAccountNumber}
								keyboardType="numeric"
								maxLength={10}
							/>
							{isError && <Text style={styles.errorText}>{isError}</Text>}
						</View>
						<View style={styles.inputContainer}>
							<Pressable onPress={() => setShowBankModal(true)}>
								<Text style={styles.label}>Select bank</Text>
							</Pressable>
							<Pressable
								onPress={() => setShowBankModal(true)}
								style={[styles.bankSelector, { backgroundColor: 'white' }]}
							>
								<Text style={{ color: theme.colors.text, padding: 5 }}>
									{selectedBank ? selectedBank?.name : 'Select bank'}
								</Text>
							</Pressable>
						</View>
						{accountName && (
							<View style={styles.accountNameContainer}>
								<Text style={styles.label}>Account Name</Text>
								<View
									style={[styles.accountNameBox, { backgroundColor: 'white' }]}
								>
									<Text style={{ color: theme.colors.text }}>
										{accountName}
									</Text>
								</View>
							</View>
						)}
						<View style={styles.buttonContainer}>
							<PrimaryButton
								label="Transfer now"
								onPress={!accountName ? () => {} : handleTransfer}
								style={{
									backgroundColor: !accountName
										? '#D0D0D0'
										: theme.colors.primary,
								}}
							/>
						</View>
					</View>
				</View>
			)}
			{showBankModal && (
				<BankModal
					handlePress={handleSelectBank}
					isModal={showBankModal}
					setIsModal={setShowBankModal}
					banks={banks}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingHorizontal: 16,
	},
	inputContainer: {
		marginBottom: 5,
	},
	label: {
		fontSize: 18,
		fontWeight: 'semibold',
		padding: 5,
	},
	input: {
		fontSize: 16,
		fontWeight: '500',
		paddingLeft: 12,
		paddingRight: 12,
		height: 48,
		borderRadius: 12,
		width: '100%',
		backgroundColor: 'white',
	},
	errorText: {
		color: 'red',
		fontSize: 10,
		padding: 5,
	},
	bankSelector: {
		padding: 10,
		borderRadius: 10,
	},
	accountNameContainer: {
		marginVertical: 10,
	},
	buttonContainer: {
		marginTop: 10,
	},
	accountNameBox: {
		padding: 10,
		borderRadius: 10,
	},
});

export default Transfer;
