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
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

type ModalProps = {
	isModal: boolean;
	setIsModal: (isModal: boolean) => void;
	data: any;
	handlePress: () => void;
	isSavePercentage: boolean;
	setIsSavePercentage: (isModal: boolean) => void;
};

const Index = ({
	isModal,
	setIsModal,
	handlePress,
	data,
	isSavePercentage,
	setIsSavePercentage,
}: ModalProps) => {
	const theme = useTheme();
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
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						Transfer to {data?.accountNumber}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						Transfer Name {data?.accountName}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						Transfer Amount {data?.amount}
					</Text>
					<Text style={{ fontSize: 16, marginBottom: 10 }}>
						Enter your PIN to proceed
					</Text>
					<View style={styles.saveContainer}>
						<View style={styles.saveCard}>
							<Text style={styles.title}>Select Bit</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text>Save 10% percent of amount send</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text style={{ color: theme.colors.primary }}>Bit</Text>
									<Text style={{ marginLeft: 5, color: theme.colors.primary }}>
										10%
									</Text>
									<Pressable onPress={() => setIsSavePercentage(true)}>
										<AntDesign
											name="checkcircleo"
											size={24}
											color={isSavePercentage ? theme.colors.primary : 'white'}
										/>
									</Pressable>
								</View>
								<View></View>
							</View>
						</View>
						<PrimaryButton onPress={handlePress} label="Confirm Transaction" />
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default Index;

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
	saveContainer: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	saveCard: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 20,
		borderRadius: 8,
		backgroundColor: 'white',
		padding: 16,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	title: {
		// marginLeft: 8,
		fontSize: 16,
		color: '#333',
	},
	radioButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
