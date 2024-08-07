import React from 'react';
// import { Colors } from '@/constants/Colors';
import { accounts, transactions, services } from '@/constants/Data';
import { FontAwesome } from '@expo/vector-icons';
import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	FlatList,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link, router } from 'expo-router';
import Transaction from '@/components/Transaction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/authContext';
import Balance from '@/components/Balance';
import { getIconComponent } from '@/hooks/getIcon';

export default function HomeScreen() {
	const theme = useTheme();
	const newServices = [...services.slice(0, 5), services[services.length - 1]];

	const { profile, token } = useAuth();
	const renderItem = ({ item }: any) => {
		const IconComponent = getIconComponent(item.iconType);
		return (
			<TouchableOpacity
				onPress={() => router.navigate(`${item.link}`)}
				key={item.id}
				style={styles.serviceItem}
			>
				<View
					style={{
						height: 50,
						width: 50,
						marginBottom: 5,
						borderRadius: 20,
						backgroundColor: item.backgroundColor,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{item.iconType === 'Feather ' ? (
						<IconComponent
							name={item.icon}
							size={26}
							color={item.color || theme.colors.primary}
						/>
					) : (
						<IconComponent
							name={item.icon}
							size={24}
							color={item.color || theme.colors.primary}
						/>
					)}
				</View>
				<Text style={{ ...styles.serviceText }}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable
					onPress={() => router.navigate('/account')}
					style={{
						padding: 10,
					}}
				>
					<Image
						source={{
							uri:
								profile?.avatar?.url ||
								`https://ui-avatars.com/api/?name=${profile?.firstName}`,
						}}
						style={{
							height: 48,
							width: 48,
							borderRadius: 24,
							borderWidth: 1,
							// borderColor: theme.colors.secondary,
							// tintColor: theme.colors.primary,
						}}
					/>
				</Pressable>
				<Link href="/notifications">
					<FontAwesome name="bell-o" size={24} color="black" />
				</Link>
			</View>
			<View
				style={{ ...styles.section, backgroundColor: theme.colors.background }}
			>
				<FlatList
					ListHeaderComponent={() => (
						<>
							<Balance data={accounts} />

							<View style={styles.sectionHeaderContainer}>
								<Text style={styles.sectionHeader}>Services</Text>
								<FlatList
									data={newServices}
									numColumns={3}
									columnWrapperStyle={{
										justifyContent: 'space-between',
										gap: 10,
									}}
									keyExtractor={(item) => `${item.id}`}
									renderItem={renderItem}
									style={{ marginTop: 12 }}
								/>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										paddingVertical: 5,
									}}
								>
									<Text style={styles.sectionHeader}>Latest transactions</Text>
									<Text style={styles.transactionText}>See all</Text>
								</View>
							</View>
						</>
					)}
					showsVerticalScrollIndicator={false}
					// showsHorizontalScrollIndicator={false}
					data={transactions}
					renderItem={({ item }) => <Transaction item={item} />}
				/>
			</View>
		</SafeAreaView>
	);
}

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
		paddingVertical: 10,
	},
	sectionHeader: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	serviceItem: {
		flex: 1,
		padding: 5,
		marginVertical: 10,
		borderRadius: 10,
		// backgroundColor: 'white',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		// shadowColor: 'white',
		// elevation: 1,
		// shadowOpacity: 0.5,
		// shadowRadius: 4,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2,
		// },
	},
	serviceText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 4,
	},
	transactionText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
