import React from 'react'
import { PressableProps, Pressable as RNPressable, StyleProp, TextStyle } from 'react-native'

// const VARIANTS = { body: { fontSize: 16 }, caption: {}, title: { fontWeight: '500', fontSize: 24 } } as { [key: string]: TextStyle }

const Pressable = (props: Props) => {
	const { children, style, onPress } = props

	return (
		<RNPressable {...{ onPress }} style={({ pressed }) => [style, pressed ? { backgroundColor: '#ddd' } : {}]}>
			{children}
		</RNPressable>
	)
}

export default Pressable

// types

interface Props extends PressableProps {
	// children: React.ReactNode
	style?: StyleProp<TextStyle>
	// variant?: 'title' | 'body' | 'caption'
	// onPress: PressableProps['onPress']
}
