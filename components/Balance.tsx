import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Animated,
	useWindowDimensions,
	TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';

const Balance = ({ data }: any) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showBal, setShowBal] = useState<boolean>(false);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef(null);
	const viewableItemsChange = useRef(({ viewableItems }: any) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;
	const { width } = useWindowDimensions();
	const theme = useTheme();
	// console.log('HomeScreen profile', width - 20);

	const cardWidth = width - 60;
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	return (
		<View style={styles.headerContainer}>
			<FlatList
				data={data}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item }) => (
					<View
						key={item.id}
						style={[
							styles.balanceCard,
							{ width: cardWidth, backgroundColor: theme.colors.primary },
						]}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Text style={styles.eyeText}>Available Balance</Text>
							<TouchableOpacity
								style={styles.eyes}
								onPress={() => setShowBal(!showBal)}
							>
								{!showBal ? (
									<FontAwesome name="eye" size={20} color="white" />
								) : (
									<FontAwesome name="eye-slash" size={20} color="white" />
								)}
							</TouchableOpacity>
						</View>
						<Text style={styles.balanceText}>
							{!showBal ? (
								<Text style={styles.balanceAmount}>₦{item.balance}</Text>
							) : (
								<Text style={styles.balanceAmount}>₦ *****</Text>
							)}
						</Text>
						<View style={styles.textcard}>
							<View>
								<Text style={styles.AccountText}>{item.name} account</Text>
								<Text style={styles.AccountText}>A/c no {item.number}</Text>
							</View>
						</View>
					</View>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				bounces={false}
				// onScroll={Animated.event(
				// 	[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				// 	{
				// 		useNativeDriver: false,
				// 	}
				// )}
				scrollEventThrottle={32}
				// viewabilityConfig={viewConfig}
				// onViewableItemsChanged={viewableItemsChange}
				// ref={slidesRef}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 10,
		borderRadius: 24,
		flex: 1,
	},
	balanceCard: {
		// width: '100%',
		gap: 4,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 18,
		paddingVertical: 16,
		backgroundColor: 'blue',
		shadowColor: 'blue',
		elevation: 5,
		shadowOpacity: 0.8,
		shadowRadius: 10,
		shadowOffset: {
			width: 0,
			height: 20,
		},
	},
	balanceText: {
		color: 'white',
		fontSize: 24,
		marginTop: 8,
		marginBottom: 12,
	},
	balanceAmount: {
		color: 'white',
		fontSize: 26,
		fontWeight: 'condensedBold',
	},
	eyeText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	eyes: {
		color: 'white',
		marginLeft: 5,
		height: '100%',
	},
	textcard: {
		marginTop: 20,
	},
	AccountText: {
		color: 'white',
	},
});
export default Balance;
