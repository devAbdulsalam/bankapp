import React from 'react';
import { Stack } from 'expo-router';

const layout = () => {
	return (
		<Stack>
			<Stack.Screen name="register" options={{ headerShown: false }} />
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="forgot-password" options={{ headerShown: false }} />
			<Stack.Screen name="setpin" options={{ headerShown: false }} />
			<Stack.Screen name="otp" options={{ headerShown: false }} />
		</Stack>
	);
};

export default layout;
