import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome6 } from '@expo/vector-icons';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Explore',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome6
							name={focused ? 'sack-dollar' : 'sack-dollar'}
							color={color}
							size={28}
							style={{ marginBottom: -3 }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: 'Account',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'person' : 'person-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					href: null,
					title: 'Notifications',
				}}
			/>
		</Tabs>
	);
}