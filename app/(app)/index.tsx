import { Colors } from '@/constants/Colors';
import { accounts, transactions, services } from '@/constants/Data';
import { FontAwesome, FontAwesome6, Feather } from '@expo/vector-icons';
import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	StatusBar,
	FlatList,
	ScrollView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import Transaction from '@/components/Transaction';

export default function HomeScreen() {
	const theme = useTheme();
	const renderItem = ({ item }: any) => {
		return (
			<View key={item.id} style={styles.serviceItem}>
				{item.iconType === 'FontAwesome' ? (
					<FontAwesome
						name={item.icon}
						size={24}
						color={theme.colors.primary}
					/>
				) : item.iconType === 'Feather ' ? (
					<Feather name={item.icon} size={26} color={theme.colors.primary} />
				) : (
					<FontAwesome6
						name={item.icon}
						size={24}
						color={theme.colors.primary}
					/>
				)}
				<Text style={{ ...styles.serviceText, color: theme.colors.primary }}>
					{item.name}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<Image
						source={require('@/assets/images/icon.png')}
						style={styles.headerImage}
					/>
					<Link href="/notifications">
						<FontAwesome name="bell-o" size={24} color="black" />
					</Link>
				</View>
				<View
					style={{
						...styles.balanceContainer,
						backgroundColor: theme.colors.primary,
					}}
				>
					<FlatList
						data={accounts}
						contentContainerStyle={{ paddingHorizontal: 10 }}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item) => `${item.id}`}
						pagingEnabled
						bounces={false}
						scrollEventThrottle={32}
						renderItem={({ item }) => (
							<View key={item.id} style={styles.balanceCard}>
								<Text style={styles.balanceText}>
									Total Balance:
									<Text style={styles.balanceAmount}> ${item.balance}</Text>
								</Text>
								<View>
									<View>
										<Text style={styles.AccountText}>{item.name} account</Text>
										<Text style={styles.AccountText}>A/c no {item.number}</Text>
									</View>
								</View>
							</View>
						)}
					/>
				</View>
			</View>
			<View
				style={{ ...styles.section, backgroundColor: theme.colors.background }}
			>
				<Text style={styles.sectionHeader}>Services</Text>
				<FlatList
					data={services}
					numColumns={3}
					columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
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
					<Text style={styles.sectionHeader}>Latest Transactions</Text>
					<Text style={styles.transactionText}>See All</Text>
				</View>
				<FlatList
					style={{ marginBottom: 20 }}
					data={transactions}
					renderItem={({ item }) => <Transaction item={item} />}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	headerContainer: {
		width: '100%',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
		// flex: 1,
		width: '100%',
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
		paddingVertical: 16,
		backgroundColor: '#D0D0D0',
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