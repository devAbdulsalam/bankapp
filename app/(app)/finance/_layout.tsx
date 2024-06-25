import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="savings" options={{ headerShown: false }} />
			<Stack.Screen name="deposite" options={{ headerShown: false }} />
			<Stack.Screen name="statement" options={{ headerShown: false }} />
			<Stack.Screen name="transfer" options={{ headerShown: false }} />
			<Stack.Screen name="confirm-transfer" options={{ headerShown: false }} />
			<Stack.Screen name="receipt" options={{ headerShown: false }} />
		</Stack>
	);
};

export default _layout;
