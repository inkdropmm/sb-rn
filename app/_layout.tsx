import { Stack } from 'expo-router'

const RootLayout = () => {
	return (
		// <GestureHandlerRootView style={{ flex: 1 }}>
		<Stack>
			<Stack.Screen name='(home)/tabs' options={{ headerShown: false }} />
		</Stack>
		// </GestureHandlerRootView>
	)
}

export default RootLayout
