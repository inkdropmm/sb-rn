import React, { useState } from 'react'
import { TextInput as RNTextInput, View, StyleProp, TextStyle, ViewProps, TextInputProps } from 'react-native'

const TextInput = (props: Props) => {
	const { children, style, multiline, value, onChangeText } = props
	const [focusing, setFocusing] = useState(false)

	return (
		<RNTextInput
			autoCapitalize={'none'}
			style={[
				{
					fontFamily: 'SNPro-Regular',
					borderWidth: 1.5,
					borderRadius: 5,
					borderColor: '#ccc',
					flex: 1,
					fontSize: 18,
					// height: 40,
					padding: 8,
					// paddingHorizontal: 8,
					lineHeight: multiline ? 24 : 20,
				},
				style,
			]}
			multiline={multiline}
			{...props}
		/>
	)
}

export default TextInput

// types
interface Props extends TextInputProps {
	// children: React.ReactNode
	// style?: StyleProp<TextStyle>
	// variant?: 'title' | 'body' | 'caption'
}
