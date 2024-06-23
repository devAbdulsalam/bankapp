import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(false);
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

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

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<QueryClientProvider client={new QueryClient()}>
					<Stack>
						<Stack.Screen name="home" options={{ headerShown: false }} />
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(app)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
