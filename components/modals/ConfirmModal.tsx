import { Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import PrimaryButton from '../PrimaryButton';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Header from '../Header';
import { calculatePercentage } from '@/hooks';

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
				<Header title="Confirm Transfer" onPress={() => setIsModal(false)} />
				<View style={styles.card}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							marginVertical: 20,
						}}
					>
						<Image
							source={{
								uri:
									data?.bankImage ||
									`https://ui-avatars.com/api/?name=${data?.bankImage}`,
							}}
							style={{
								height: 60,
								width: 60,
								borderRadius: 30,
								borderWidth: 1,
								// borderColor: COLORS.secondary,
							}}
						/>
					</View>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						Transfer to {data?.accountName}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						Account Number {data?.accountNumber}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						Amount: ₦{data?.amount}
					</Text>

					<View style={styles.saveCard}>
						<View style={{}}>
							<Text style={styles.title}>Save a bit</Text>
							<View style={{}}>
								<Text>
									Save <Text style={{ color: theme.colors.primary }}>10%</Text>{' '}
									percent of amount spend
								</Text>
								<Text>
									Would you like to save{' '}
									<Text
										style={{ color: theme.colors.primary, fontWeight: 'bold' }}
									>
										₦{calculatePercentage(data.amount)}
									</Text>{' '}
									of ₦{data.amount}
								</Text>
							</View>
						</View>
						<Pressable
							onPress={() => setIsSavePercentage(!isSavePercentage)}
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<AntDesign
								name="checkcircle"
								size={24}
								color={isSavePercentage ? theme.colors.primary : 'gray'}
							/>
						</Pressable>
					</View>
					<View style={styles.saveContainer}>
						<Text
							style={{
								fontSize: 16,
								marginBottom: 10,
								textAlign: 'center',
								width: '100%',
							}}
						>
							Enter your PIN to proceed
						</Text>
						<PrimaryButton onPress={handlePress} label="Confirm Transfer" />
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 16,
	},
	saveContainer: {
		width: '100%',
		padding: 10,
		marginVertical: 10,
	},
	saveCard: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
		paddingBottom: 8,
		fontSize: 20,
		color: '#333',
		fontWeight: 'bold',
	},
	radioButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
export default Index;
