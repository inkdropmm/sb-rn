import { Text } from '@inkdropmm/ui'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

const Page = () => {
	const { id } = useLocalSearchParams()
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Unit - {id}</Text>
		</View>
	)
}

export default Page
