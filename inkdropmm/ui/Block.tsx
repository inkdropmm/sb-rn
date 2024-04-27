import { View, ViewProps } from 'react-native'

const Block = (props: ViewProps) => {
	return <View {...props} style={[{}, props.style]}></View>
}

export default Block
