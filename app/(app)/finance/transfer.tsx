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
import { fetchBanks, verifyAccount } from '@/api';

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
	const [amount, setAmount] = useState(0);
	const [remark, setRemark] = useState('');
	const [showBankModal, setShowBankModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handelSelectBank = async (item: any) => {
		try {
			setBank(data);
			if (!accountNumber) {
				return Alert.alert('Invalid Account Number');
			}
			const data = {
				accountNumber,
				bank,
			};
			const checkAccount = await verifyAccount(data);

			console.log(checkAccount);
			setAccountName('checkAccount');
		} catch (error) {}
	};

	const handleTransfer = async () => {
		try {
			if (!accountNumber) {
				return Alert.alert('Invalid Account Number');
			}

			const data = {
				accountName,
				accountNumber,
				amount,
				remark,
				bank,
			};

			await axios.post(`${apiUrl}/`, data).then((res) => {
				res.data;
			});
		} catch (error) {}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<View>
					<Text>transfer</Text>
					<View>
						<Text>Bank</Text>
						<Pressable onPress={() => setShowBankModal(true)}>
							Select bank
						</Pressable>
					</View>
					<View>
						<Text>Account number</Text>
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
								value={accountNumber}
								onChangeText={setAccountNumber}
							/>
						</View>
					</View>
					<View>
						<Text>Account Name</Text>
					</View>
					<View>
						<Text>Amount</Text>
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
								value={accountNumber}
								onChangeText={setAccountNumber}
							/>
						</View>
					</View>
					<View>
						<Text>Remark</Text>
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
								value={accountNumber}
								multiline
								onChangeText={setAccountNumber}
							/>
						</View>
					</View>
					{!accountName ? (
						<Pressable
							// onPress={() => handlePress(item)}
							style={[
								styles.button,
								{ backgroundColor: theme.colors.background },
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
			)}
			{showBankModal && (
				<BankModal
					handelPress={handelSelectBank}
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

