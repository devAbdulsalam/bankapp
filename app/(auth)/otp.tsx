import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';

const otp = () => {
	const [countDown, setCountDown] = useState(30);
	const [otp, setOtp] = useState('');
	const timer = setInterval(() => {
		if (countDown > 0) {
			setCountDown(countDown - 1);
		} else {
			clearInterval(timer);
		}
	});

	const verifyOtp = () => {
		if (otp.length === 4) {
			// Verify OTP and navigate to home screen
		} else {
			alert('Invalid OTP');
		}
	};
	const reSendOtp = () => {
		if (countDown > 0) {
			alert('Resending OTP...');
			setCountDown(30);
			reSendOtp();
		}
	};
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>Enter OTP</Text>
				<TextInput
					style={styles.input}
					value={otp}
					onChangeText={setOtp}
					keyboardType="number-pad"
				/>
				<PrimaryButton label="Verify OTP" onPress={verifyOtp} />
				<Pressable style={styles.button} onPress={() => {}}>
					<Text>Didnt receive OTP</Text>
					<Text style={{ color: 'green' }}>Resend in {countDown}</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default otp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#757575',
		padding: 10,
		marginBottom: 20,
		width: '80%',
		borderRadius: 5,
	},
	countdown: {
		color: 'green',
		fontSize: 16,
	},
	resendText: {
		color: 'green',
		fontSize: 16,
		marginTop: 10,
	},
	resendButton: {
		padding: 10,
		backgroundColor: '#4CAF50',
		borderRadius: 5,
		marginTop: 10,
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	button: {
		padding: 10,
		backgroundColor: '#4CAF50',
		borderRadius: 5,
		marginVertical: 10,
	},
});
