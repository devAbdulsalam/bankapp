import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type ModalProps = {
	isModal: boolean;
	setIsModal: (isModal) => void;
};

const LoadingModal = ({ isModal }: ModalProps) => {
	return (
		<Modal
			visible={isModal}
			statusBarTranslucent={true}
			transparent={true}
			animationType="slide"
		>
			<View style={styles.overlay}>
				<View style={styles.card}>
					<ActivityIndicator />
					<Text>Loading ....</Text>
				</View>
			</View>
		</Modal>
	);
};

export default LoadingModal;

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'rgba(0,0,0,0,0.5)',
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
