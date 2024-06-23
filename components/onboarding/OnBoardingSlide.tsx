import {
	Image,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';

const OnBoardingSlide = ({ item }) => {
	const { width } = useWindowDimensions();
	return (
		<View style={[styles.container, { width }]}>
			<Animated.View
				entering={FadeInUp.delay(200).duration(1000).springify()}
				style={{ paddingHorizontal: 20 }}
			>
				<Image
					source={item.image}
					style={[styles.image, { width }]}
					resizeMode="contain"
				/>
			</Animated.View>
			<View style={{ flex: 0.3 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.desription}>{item.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 0.7,
		justifyContent: 'center',
		color: 'green',
	},
	title: {
		fontWeight: '800',
		fontSize: 28,
		marginBottom: 10,
		color: 'green',
		textAlign: 'center',
	},
	desription: {
		fontWeight: '300',
		color: '#62656b',
		textAlign: 'center',
		paddingHorizontal: 64,
	},
});
export default OnBoardingSlide;
