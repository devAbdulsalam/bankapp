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
				name="finance"
				options={{
					title: 'Finance',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'cash' : 'cash'} color={color} />
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
			<Tabs.Screen
				name="services"
				options={{
					href: null,
					title: 'Services',
				}}
			/>
			<Tabs.Screen
				name="transactions"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="transaction"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="rewards"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="customer-service"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
