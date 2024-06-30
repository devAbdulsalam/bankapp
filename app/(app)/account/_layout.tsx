import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="edit" options={{ headerShown: false }} />
			<Stack.Screen name="change-pin" options={{ headerShown: false }} />
			<Stack.Screen name="avatar" options={{ headerShown: false }} />
		</Stack>
	);
};

export default _layout;
