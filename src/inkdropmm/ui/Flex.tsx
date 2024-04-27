import React from 'react'
import { View, StyleProp, TextStyle, ViewProps } from 'react-native'

const VARIANTS = { body: { fontSize: 16 }, caption: { fontSize: 20 }, title: { fontWeight: '500', fontSize: 24 } } as { [key: string]: TextStyle }

const Flex = (props: Props) => {
	const { children, style } = props

	return <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, style]}>{children}</View>
}

export default Flex

// types
interface Props extends ViewProps {
	// children: React.ReactNode
	// style?: StyleProp<TextStyle>
	// variant?: 'title' | 'body' | 'caption'
}
