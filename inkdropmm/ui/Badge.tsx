import React from 'react'
import { View, StyleProp, TextStyle, ViewProps, Text } from 'react-native'

const VARIANTS = { success: { bgColor: '#ecf7f3', color: '#15b886' }, error: { bgColor: '#ffeeee', color: '#fa5352' }, info: { bgColor: '#ecf0fe', color: '#4c6ef5' } } as {
	[key: string]: { color: string; bgColor: string }
}

const Badge = (props: Props) => {
	const { children, style, variant = 'info' } = props
	const { bgColor, color } = VARIANTS[variant]

	return (
		<View
			style={[
				{
					paddingHorizontal: 8,
					borderRadius: 12,
					borderWidth: 1,
					borderColor: '#ddd',
					paddingBottom: 1,
					backgroundColor: bgColor,
				},
				style,
			]}
		>
			<Text style={{ color, fontWeight: '500' }}>{children}</Text>
		</View>
	)
}

export default Badge

// types
interface Props extends ViewProps {
	// children: React.ReactNode
	// style?: StyleProp<TextStyle>
	variant?: 'success' | 'error' | 'info'
}
