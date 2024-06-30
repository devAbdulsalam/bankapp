import {
	Modal,
	StyleSheet,
	Text,
	Alert,
	View,
} from 'react-native';
import React from 'react';
import PrimaryButton from '../PrimaryButton';
import OtpInput from 'react-native-animated-otp-input';
import { useTheme } from '@react-navigation/native';
import Header from '../Header';
type ModalProps = {
	isModal: boolean;
	pin: string;
	setIsModal: (isModal: boolean) => void;
	setPin: (pin: string) => void;
	handleTransfer: () => void;
};

const LoadingModal = ({
	isModal,
	handleTransfer,
	pin,
	setPin,
	setIsModal,
}: ModalProps) => {
	const theme = useTheme();

	const userPin = '1234';

	const checkPin = (code: string) => {
		console.log({ code });
		if (!code) {
			return;
		}
		if (code.toString() === userPin) {
			Alert.alert(
				'Success',
				'Transfer Successful',
				[
					{
						text: 'OK',
						onPress: () => {
							setIsModal(false);
						},
					},
				],
				{ cancelable: false }
			);
		}
	};
	return (
		<Modal
			visible={isModal}
			statusBarTranslucent={true}
			transparent={true}
			animationType="slide"
		>
			<View style={styles.overlay}>
				<Header title="Enter Pin" onPress={() => setIsModal(false)} />
				<View style={{ backgroundColor: theme.colors.background }}>
					<View style={styles.card}>
						<OtpInput
							otpCount={4}
							autoFocus={false}
							onCodeFilled={(code: number) => checkPin(code.toString())}
							onCodeChanged={(codes: number) => setPin(codes.toString())}
						/>
						<Text style={{ textAlign: 'center', marginVertical: 16 }}>
							Please enter your PIN
						</Text>
						<View style={{ padding: 20 }}>
							<PrimaryButton
								label="Transfer now"
								onPress={!pin ? () => {} : handleTransfer}
								style={{
									backgroundColor: !pin ? '#D0D0D0' : theme.colors.primary,
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default LoadingModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
	},
	conatiner: {
		// backgroundColor: 'rgba(0,0,0,0.5)',
		opacity: 0.8,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 10,
		// padding: 16,
	},
});
