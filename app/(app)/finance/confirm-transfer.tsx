import {
	Pressable,
	StyleSheet,
	Image,
	Text,
	TextInput,
	View,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
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
import { getAxiosError } from '@/hooks/getError';
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
	const [isAmountCorrect, setIsAmountCorrect] = useState(false);
	const [isConfirmModal, setIsConfirmModal] = useState(false);
	const { accountName, accountNumber, bankCode, bankName, bankImage } =
		useLocalSearchParams();
	const params = useLocalSearchParams();

	const balance = '3000';
	const date = new Date();

	const checkAccount = useCallback(async () => {
		// return if amount is greather than 10 naira
		if (!amount || +amount <= 10) {
			setIsAmountCorrect(false);
			return;
		}
		if (+amount <= +balance) {
			setIsAmountCorrect(true);
			return;
		} else {
			setIsAmountCorrect(false);
			return;
		}
	}, [amount, balance]);

	useEffect(() => {
		checkAccount();
	}, [amount, balance]);

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
		setIsConfirmModal(true);
	};
	const handleShowEnterPinModal = async () => {
		setIsEnterPin(true);
		setIsConfirmModal(false);
	};
	const handleTransfer = async () => {
		try {
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
				bankCode,
				amount,
				remark,
				pin,
				isSavePercentage,
			};
			// axios
			// 	.post(`${apiUrl}/transfer`, data)
			// 	.then((response) => {
			// 		if (response.status === 200) {
			// 			console.log(response.data);
			setAmount('');
			setRemark('');
			setIsLoading(false);
			router.navigate({
				pathname: '/finance/receipt',
				params: { ...params, amount, date: date.toDateString() },
			});
			// }
			// })
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			const message = getAxiosError(error);
			setIsError(message);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Header title="Send money" onPress={() => router.back()} />
					<View style={styles.container}>
						<View
							style={{
								justifyContent: 'space-between',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<View
								style={{
									padding: 10,
								}}
							>
								<Image
									source={{
										uri:
											bankImage ||
											`https://ui-avatars.com/api/?name=${bankImage}`,
									}}
									style={{
										height: 48,
										width: 48,
										borderRadius: 24,
										borderWidth: 1,
										// borderColor: COLORS.secondary,
									}}
								/>
							</View>
							<View style={{ marginLeft: 2 }}>
								<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
									Account Name: {accountName}
								</Text>
								<Text
									style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}
								>
									Bank: {bankName}({accountNumber})
								</Text>
							</View>
						</View>
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
						<View style={{ justifyContent: 'center' }}>
							<Text style={{ color: theme.colors.text, fontWeight: '600' }}>
								Balance: ₦<Text style={{ color: 'green' }}>{balance}</Text>
							</Text>
							{isError && <Text style={styles.errorText}>{isError}</Text>}
						</View>
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
							label="Transfer now"
							onPress={!isAmountCorrect ? () => {} : handleShowConfirmModal}
							style={{
								backgroundColor: !isAmountCorrect
									? '#D0D0D0'
									: theme.colors.primary,
							}}
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
