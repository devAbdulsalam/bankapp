import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import Header from '@/components/Header';
import axios from 'axios';
import Loader from '@/components/Loader';
import PinModal from '@/components/modals/PinModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { AntDesign } from '@expo/vector-icons';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const confirm = () => {
	const { profile, token } = useAuth();
	const theme = useTheme();
	const [amount, setAmount] = useState('');
	const [remark, setRemark] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState('');
	const [isSavePercentage, setIsSavePercentage] = useState(false);
	const [pin, setPin] = useState('');
	const [isEnterPin, setIsEnterPin] = useState(false);
	const [isConfirmModal, setIsConfirmModal] = useState(false);
	const { accountName, accountNumber, bank } = useLocalSearchParams();
	const params = useLocalSearchParams();

	const balance = '3000';

	const handleShowConfirmModal = async () => {
		if (+amount <= 10) {
			setIsError('Amount should be greater than 10');
			return;
		}
		if (+amount > +balance) {
			setIsError('Account balance is not sufficient');
			return;
		}
		setIsError('');
		setIsEnterPin(true);
	};
	const handleShowEnterPinModal = async () => {
		setIsConfirmModal(false);
		setIsEnterPin(true);
	};
	const handleTransfer = async () => {
		if (+amount <= 10) {
			setIsError('Amount should be greater than 10');
			return;
		}
		if (+amount > +balance) {
			setIsError('Account balance is not sufficient');
			return;
		}
		setIsLoading(true);
		setIsEnterPin(false);
		setIsError('');
		const data = {
			accountName,
			accountNumber,
			bank,
			amount,
			remark,
			pin,
			isSavePercentage,
		};
		axios
			.post(`${apiUrl}/transfer`, data)
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
					alert('Transfer Successful');
					setAmount('');
					setRemark('');
					router.navigate({
						pathname: '/finance/receipt',
						params: { ...params, amount },
					});
				}
			})
			.catch((error) => {
				console.log(error);
				setIsError('Something went wrong');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Header title="Send money" onPress={() => router.back()} />
					<View style={styles.container}>
						<Text>Account Name: {accountName}</Text>
						<Text>Account Number: {accountNumber}</Text>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Amount</Text>
							<TextInput
								placeholder="Your Amoumt"
								style={styles.input}
								value={amount}
								onChangeText={setAmount}
								keyboardType="numeric"
							/>
						</View>

						<Text>Balance: N {balance}</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Remark</Text>
						<TextInput
							placeholder="Your Remark"
							style={styles.input}
							value={remark}
							multiline
							onChangeText={setRemark}
						/>
					</View>
					<View style={styles.saveContainer}>
						<PrimaryButton
							label="Trasfer now"
							onPress={handleShowConfirmModal}
						/>
					</View>
					{isConfirmModal && (
						<ConfirmModal
							isModal={isConfirmModal}
							setIsModal={setIsConfirmModal}
							data={{ ...params, amount }}
							handlePress={handleShowEnterPinModal}
							setIsSavePercentage={setIsSavePercentage}
							isSavePercentage={isSavePercentage}
						/>
					)}
					{isEnterPin && (
						<PinModal
							isModal={isEnterPin}
							setIsModal={setIsEnterPin}
							pin={pin}
							setPin={setPin}
							handleTransfer={handleTransfer}
						/>
					)}
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
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
	accountNameBox: {
		padding: 10,
		borderRadius: 10,
	},
	saveContainer: {
		padding: 20,
	},
});

export default confirm;
