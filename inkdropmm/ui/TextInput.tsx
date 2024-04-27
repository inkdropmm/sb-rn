import React, { useState } from 'react'
import { TextInput as RNTextInput, View, StyleProp, TextStyle, ViewProps, TextInputProps } from 'react-native'

const TextInput = (props: Props) => {
	const { children, style, value, onChangeText } = props
	const [focusing, setFocusing] = useState(false)

	return <RNTextInput {...props} style={{ borderWidth: 1, flex: 1, fontSize: 18, padding: 6 }} />
}

export default TextInput

// types
interface Props extends TextInputProps {
	// children: React.ReactNode
	// style?: StyleProp<TextStyle>
	// variant?: 'title' | 'body' | 'caption'
}
