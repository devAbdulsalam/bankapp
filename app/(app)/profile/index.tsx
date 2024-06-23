import React from 'react';
import {
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Index = ({ profile }: any) => {
	return (
		<View style={styles.header}>
			<View
				style={{
					justifyContent: 'space-between',
					flexDirection: 'row',
				}}
			>
				<Link
					href={'/(app)/user/profile'}
					asChild
					style={{
						padding: 10,
					}}
				>
					<Image
						source={{
							uri:
								// profile?.avatar ||
								`https://ui-avatars.com/api/?name=${profile?.username}`,
						}}
						style={{
							height: 48,
							width: 48,
							borderRadius: 24,
							borderWidth: 1,
							borderColor: COLORS.secondary,
						}}
					/>
				</Link>
				<Pressable
					onPress={() => router.push('/(app)/')}
					style={{
						paddingHorizontal: 10,
						paddingVertical: 12,
						backgroundColor: 'white',
						borderRadius: 10,
					}}
				>
					<FontAwesome name="bell" size={18} color={COLORS.secondary} />
				</Pressable>
			</View>
			{/* <Text style={styles.headerText}>Welcome</Text> */}
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	header: {
		width: '100%',
		padding: 15,
		paddingTop: StatusBar.currentHeight,
		// backgroundColor: 'white',
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});
