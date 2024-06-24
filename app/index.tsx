import { StyleSheet, FlatList, View, Animated } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import OnBoardingItem from '@/components/onboarding/OnBoardingSlide';
import { onBoardingData } from '@/constants/Data';
import Paginator from '@/components/onboarding/Paginator';
import NavigationButtons from '@/components/onboarding/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Onboarding = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slides, setSlides] = useState(onBoardingData);
	
	const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(false);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef(null);


	useEffect(() => {
		const fetchSession = async () => {
			const isOnboarded = await AsyncStorage.getItem('isAppFirstLaunched');
			if (isOnboarded == null || isOnboarded === 'false') {
				setIsAppFirstLaunched(false);
			} else {
				setIsAppFirstLaunched(true);
				// AsyncStorage.removeItem('isAppFirstLaunched');
			}
		};
		fetchSession();
	}, []);

	const viewableItemsChange = useRef(({ viewableItems }: any) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const scrollBack = () => {
		if (currentIndex > 0) {
			slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
		}
	};
	const skipSlides = () => {
		const lastSlide = slides.length - 1;
		slidesRef.current.scrollToIndex({
			index: lastSlide,
		});
	};
	const scrollForward = async () => {
		if (currentIndex < slides.length - 1) {
			slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			try {
				await AsyncStorage.setItem('isAppFirstLaunched', 'true');
				router.replace('/home');
			} catch (error) {
				console.log('Error @ set isOnbaording', error);
			}
		}
	};
	return (
		<View style={styles.container}>
			<View style={{ flex: 3 }}>
				<FlatList
					data={onBoardingData}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => <OnBoardingItem item={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						}
					)}
					scrollEventThrottle={32}
					viewabilityConfig={viewConfig}
					onViewableItemsChanged={viewableItemsChange}
					ref={slidesRef}
				/>
			</View>
			<Paginator data={onBoardingData} scollX={scrollX} />
			<NavigationButtons
				scrollForward={scrollForward}
				scrollBack={scrollBack}
				skipSlides={skipSlides}
				currentIndex={currentIndex}
			/>
		</View>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 20,
		backgroundColor: 'white',
	},
});
