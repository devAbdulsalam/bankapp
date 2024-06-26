import {
	StyleSheet,
	Text,
	View,
	Modal,
	Pressable,
	TextInput,
	Image,
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
	banks: {
		id: string | null;
		code: string;
		name: string;
		slug: string | null;
		logo: string;
	}[];
};

const BankModal = ({ handlePress, isModal, setIsModal, banks }: ModalProps) => {
	const theme = useTheme();
	const [query, setQuery] = useState('');
	const [bankList, setBankList] = useState(banks);
	// console.log('bankList==========================);', bankList);

	const searchBank = useCallback(
		debounce((searchQuery) => {
			if (!searchQuery) {
				setBankList(banks);
				return;
			}
			if (banks.length < 0) {
				return;
			}
			const filteredBanks = banks.filter(
				(item) =>
					item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
				<Header title="Select Bank" onPress={() => setIsModal(false)} />
				<View style={{ backgroundColor: theme.colors.background, padding: 10 }}>
					<View
						style={{
							position: 'relative',
							width: '100%',
							marginVertical: 5,
							paddingHorizontal: 10,
						}}
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
								borderRadius: 10,
								borderColor: theme.colors.border,
								backgroundColor: 'white',
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
								left: 20,
								top: 12,
							}}
						/>
					</View>
					<FlatList
						data={bankList}
						keyExtractor={(item) => item.code}
						renderItem={({ item }) => {
							return (
								<Pressable
									onPress={() => handlePress(item)}
									style={[styles.cardItem]}
								>
									<Image
										source={{ uri: item.logo }}
										style={{
											height: 40,
											width: 40,
											borderRadius: 20,
											borderWidth: 1,
											marginRight: 10,
											// borderColor: COLORS.secondary,
										}}
									/>
									<Text style={[styles.text, { color: theme.colors.text }]}>
										{item.name}
									</Text>
								</Pressable>
							);
						}}
						contentContainerStyle={{ padding: 10 }}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default BankModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
	},
	cardItem: {
		padding: 16,
		marginVertical: 4,
		borderRadius: 8,
		flexDirection: 'row',
		backgroundColor: 'white',
		// justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		// textAlign: 'center',
	},
});
