import { IconMessages, IconMoodPin, IconUser } from '@tabler/icons-react-native'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen name='map' options={{ title: 'Find Buddy', tabBarIcon: (props) => <IconMoodPin {...props} /> }} />
			<Tabs.Screen name='chat' options={{ title: 'Chat', tabBarIcon: (props) => <IconMessages {...props} /> }} />
			<Tabs.Screen name='user' options={{ title: 'Account', tabBarIcon: (props) => <IconUser {...props} /> }} />
		</Tabs>
	)
}

export default TabsLayout
