import {
	StyleSheet,
	Text,
	View,
	Modal,
	Pressable,
	TextInput,
	FlatList,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Header';
import debounce from 'lodash.debounce';

type ModalProps = {
	isModal: boolean;
	setIsModal: () => void;
	handlePress: (item: any) => void;
	banks: { id: string | null; code: string; name: string; logo: string }[];
};

const BankModal = ({ handlePress, isModal, setIsModal, banks }: ModalProps) => {
	const theme = useTheme();
	const [query, setQuery] = useState('');
	const [bankList, setBankList] = useState(banks);

	const searchBank = useCallback(
		debounce((searchQuery) => {
			if (!searchQuery) {
				setBankList(banks);
				return;
			}
			const filteredBanks = banks.filter(
				(item) =>
					item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					// item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.code.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setBankList(filteredBanks);
		}, 300),
		[banks]
	);

	useEffect(() => {
		searchBank(query);
	}, [query, searchBank]);

	return (
		<Modal
			visible={isModal}
			statusBarTranslucent={true}
			transparent={true}
			animationType="slide"
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<Header title="Select Bank" onPress={() => setIsModal(false)} />
					<View
						style={{ position: 'relative', width: '100%', marginVertical: 10 }}
					>
						<TextInput
							placeholder="Search Bank"
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
							value={query}
							onChangeText={setQuery}
						/>
						<Ionicons
							name="search-outline"
							size={24}
							color={theme.colors.text}
							style={{
								position: 'absolute',
								left: 12,
								top: 12,
							}}
						/>
					</View>
					<View style={styles.card}>
						<FlatList
							data={bankList}
							keyExtractor={(item) => item.code}
							renderItem={({ item }) => (
								<Pressable
									onPress={() => handlePress(item)}
									style={[
										styles.cardItem,
										{ backgroundColor: theme.colors.background },
									]}
								>
									<Text style={[styles.text, { color: theme.colors.text }]}>
										{item.name}
									</Text>
								</Pressable>
							)}
							contentContainerStyle={{ padding: 10 }}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default BankModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	container: {
		width: '90%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 8,
	},
	card: {
		flex: 1,
	},
	cardItem: {
		padding: 16,
		marginVertical: 4,
		borderRadius: 8,
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		textAlign: 'center',
	},
});
