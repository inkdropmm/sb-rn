import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'

const RootLayout = () => {
	const [fontsLoaded, fontError] = useFonts({
		'SNPro-Thin': require('../assets/fonts/SNPro/SNPro-Thin.otf'),
		'SNPro-Regular': require('../assets/fonts/SNPro/SNPro-Regular.otf'),
		'SNPro-Medium': require('../assets/fonts/SNPro/SNPro-Medium.otf'),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			console.log({ fontError })
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded, fontError])

	if (!fontsLoaded && !fontError) {
		return null
	}

	console.log('RootLayout')
	return (
		// <GestureHandlerRootView style={{ flex: 1 }}>
		<View onLayout={onLayoutRootView} style={{ flex: 1 }}>
			<Stack>
				<Stack.Screen name='(home)/tabs' options={{ headerShown: false }} />
			</Stack>
		</View>
		// </GestureHandlerRootView>
	)
}

export default RootLayout
