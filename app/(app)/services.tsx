import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { services } from './../../constants/Data';
import { getIconComponent } from '@/hooks/getIcon';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

const servicePage = () => {
	const theme = useTheme();
	const minusLastItem = services?.slice(0, -1);

	const renderItem = ({ item }: any) => {
		const IconComponent = getIconComponent(item.iconType);
		return (
			<Pressable
				onPress={() => router.navigate(`${item.link}`)}
				key={item.id}
				style={styles.serviceItem}
			>
				{item.iconType === 'Feather ' ? (
					<IconComponent
						name={item.icon}
						size={26}
						color={theme.colors.primary}
					/>
				) : (
					<IconComponent
						name={item.icon}
						size={24}
						color={theme.colors.primary}
					/>
				)}
				<Text style={{ ...styles.serviceText, color: theme.colors.primary }}>
					{item.name}
				</Text>
			</Pressable>
		);
	};

	return (
		<View style={{flex: 1}}>
			<Header title="Services" onPress={() => router.back()} />
			<View style={styles.sectionHeaderContainer}>
				<FlatList
					data={minusLastItem}
					numColumns={3}
					columnWrapperStyle={{
						justifyContent: 'space-between',
						gap: 5,
					}}
					keyExtractor={(item) => `${item.id}`}
					renderItem={renderItem}
					style={{ marginTop: 12 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		// paddingTop: StatusBar.currentHeight,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		backgroundColor: 'white',
		// paddingTop: StatusBar.currentHeight,
	},
	headerImage: {
		height: 24,
		width: 24,
	},
	balanceContainer: {
		marginVertical: 16,
		padding: 16,
		borderRadius: 8,
	},
	balanceCard: {
		width: '90%',
		gap: 4,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 16,
		shadowColor: 'white',
	},
	balanceText: {
		color: 'white',
		fontSize: 20,
		marginVertical: 12,
	},
	balanceAmount: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
	},
	AccountText: {
		color: 'white',
	},
	section: {
		paddingHorizontal: 16,
		// paddingTop: 16,
		backgroundColor: '#D0D0D0',
		flex: 1,
	},
	sectionHeaderContainer: {
		flex: 1,
		padding: 10,
	},
	sectionHeader: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	serviceItem: {
		flex: 1,
		padding: 14,
		marginVertical: 10,
		borderRadius: 10,
		backgroundColor: 'white',
		shadowColor: 'white',
		shadowOpacity: 0.2,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	serviceText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10,
	},
	transactionText: {
		fontSize: 16,
	},
});
export default servicePage;
