import { Pressable } from '@inkdropmm/ui'
import { IconCirclePlus } from '@tabler/icons-react-native'
import React from 'react'
import { PressableProps } from 'react-native'

const AddIconBtn = ({ onPress }: { onPress?: PressableProps['onPress'] }) => {
	return (
		<Pressable onPress={onPress} style={{ padding: 3 }}>
			<IconCirclePlus />
		</Pressable>
	)
}

export default AddIconBtn
