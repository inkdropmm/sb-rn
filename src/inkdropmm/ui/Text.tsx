import React from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'

const VARIANTS = {
	superSmall: { fontSize: 12 },
	small: { fontSize: 14 },
	body: { fontSize: 16 },
	caption: { fontWeight: '500', fontSize: 20 },
	title: { fontWeight: '500', fontSize: 24 },
} as {
	[key: string]: TextStyle
}

const Text = (props: Props) => {
	const { children, variant = 'body', style } = props

	return (
		<RNText {...{}} style={[VARIANTS[variant], style]}>
			{children}
		</RNText>
	)
}

export default Text

// types
interface Props {
	children: React.ReactNode
	style?: StyleProp<TextStyle>
	variant?: 'superSmall' | 'small' | 'title' | 'body' | 'caption'
}
