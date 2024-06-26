import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React from 'react';
import PrimaryButton from '../PrimaryButton';

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
	return (
		<Modal
			visible={isModal}
			statusBarTranslucent={true}
			transparent={true}
			animationType="slide"
		>
			<View style={styles.overlay}>
				<View style={styles.card}>
					<Pressable onPress={() => setIsModal(false)}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
					</Pressable>
					<ActivityIndicator />
					<Text>Loading ....</Text>
					<Text>Please enter your PIN</Text>
					<TextInput value={pin} onChangeText={setPin} secureTextEntry={true} />
					<PrimaryButton onPress={handleTransfer} label="Transfer Now" />
				</View>
			</View>
		</Modal>
	);
};

export default LoadingModal;

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		opacity: 0.8,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 16,
	},
});
