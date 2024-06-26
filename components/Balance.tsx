import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Animated,
	useWindowDimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';

const Balance = ({ data }: any) => {
	const [currentIndex, setCurrentIndex] = useState(0);
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
						<Text style={styles.balanceText}>
							Total Balance:
							<Text style={styles.balanceAmount}> ₦{item.balance}</Text>
						</Text>
						<View>
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
});
export default Balance;

