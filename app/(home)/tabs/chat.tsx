import { Badge, Flex, Pressable, Text, TextInput } from '@inkdropmm/ui'
// import { AddIconBtn } from '@inkdrop/ui/app'
import { IconArrowUp } from '@tabler/icons-react-native'
import { useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSocket } from '@hooks'

dayjs.extend(relativeTime)

const cUser = 'IsAq7e3b3eILVPLMAABh'

const pStyle = { paddingHorizontal: 12, paddingVertical: 12 }
const msgs = Array.from({ length: 10 }, (_, i) => ({
	id: i.toString(),
	userId: Math.random() > 0.5 ? cUser : 'agj1U9E1-XYD3ZunAAAN',
	content: `Message ${i + 1}`,
}))
// console.log(msgs)

const Page = () => {
	const [messages, setMessages] = useState<any[]>([])
	const [input, setInput] = useState('')
	const [socket, ready] = useSocket({ userId: '662e34a254ba5a555930bf63' })

	const ref = useRef<FlatList<any>>(null)

	useEffect(() => {
		if (!socket) return
		socket.on('chat.message', (msg) => {
			// console.log('message: ' + msg)
			setMessages((prev) => [...prev, msg])
		})

		return () => {
			socket.close()
		}
	}, [socket])

	if (!socket) return null

	return (
		<View style={{ flex: 1 }}>
			{/* <Flex style={[pStyle, { marginTop: 12 }]}>
				<Text variant='title'>Rooms</Text>
				<Link href='/room/create' asChild>
					<Pressable style={{ padding: 3 }}>
						<IconCirclePlus />
					</Pressable>
				</Link>
			</Flex> */}
			<FlatList
				data={messages}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					const mine = item.userId === socket.id
					return (
						<View style={{ marginBottom: 8, alignSelf: !mine ? 'flex-start' : 'flex-end' }}>
							<View
								style={{
									borderRadius: 8,
									borderBottomRightRadius: mine ? 0 : 8,
									borderBottomLeftRadius: mine ? 8 : 0,
									backgroundColor: '#006684ff',
									padding: 8,
								}}
							>
								<Text style={{ color: 'white' }}>{item.content}</Text>
							</View>
							<Text variant='superSmall' style={{ marginTop: 4 }}>
								{dayjs(item.createdAt).fromNow()}
							</Text>
						</View>
					)
				}}
				style={{ paddingHorizontal: 12, paddingTop: 12 }}
				onContentSizeChange={() => ref.current?.scrollToEnd()}
				contentContainerStyle={{ gap: 0 }}
				ref={ref}
			/>
			<KeyboardAvoidingView keyboardVerticalOffset={110} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<Flex style={{ padding: 8, gap: 8 }}>
					<TextInput multiline value={input} onChangeText={setInput} placeholder='Start typing... ' />
					<Pressable
						onPress={() => {
							socket.emit('chat.message', input)
							Keyboard.dismiss()
							// console.log('sent')
						}}
						style={{ padding: 8, borderRadius: 5, backgroundColor: '#006684ff' }}
					>
						<IconArrowUp color='#fff' />
					</Pressable>
				</Flex>
			</KeyboardAvoidingView>
		</View>
	)
}

export default Page

const testMsgs = [
	{ content: 'A sin pyay mr pr', id: 'da5872b3-6a5d-4260-8042-d14890d1c94b', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'testle', id: '2f998aa0-4c30-4ef0-b720-757b970d9a58', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'A sin pyay mr pr', id: '91b535f1-b968-4ae5-9558-1db5509c1678', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'Min Nae Ko Nae', id: '9080cdb8-a7bc-4e18-924c-061c6504c45d', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'See Chr Ny P Kwr', id: 'd146c54b-9ca4-4e64-aea8-a2c0cfe3cf2d', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'Wan Nae tat Tu ko', id: 'b6a73d23-bbc1-4a52-b937-d19e55eb7da3', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'Min Htet M Nate Sat Nae Tou', id: 'ec3258e5-d045-49f6-bb53-414688439726', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'A Chit Ka Koe A Twat So', id: '7b6f395b-5bf3-4f02-af10-dd28a85dc9fd', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'A Myal Tan Shone Mae Tite Pwe Ta Khu', id: 'efe5df80-1162-4243-8946-2880b426cc53', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'Nout Ta Khout M shone Chin Pr', id: '2012e192-4b6e-4bb0-8744-3d02c53fd9a6', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'Min Ngr A Twat M Kyie Nae TOu', id: 'f00b89dc-60fe-4eb8-8d1b-f652297052a8', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'Hou Away SOne Ta Fat Mr Ba Wa Ko Pyn A Thit Sa', id: '864f50ad-c221-4c1b-a80e-8b3d5ecf5ce2', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'Min Kyoune tr M Pyw yt pr', id: '95924231-fe84-44fe-a086-1e4a151e10a2', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'De lo a sone tat foe a kyoune Shie Khae loz pl', id: '458bfbd0-bfb6-4033-9696-721d1d892929', userId: 'heRfRKHJOXfFpDRAAAAB' },
	{ content: 'De lo Zat Thein Fou Pyit Nyat Htrrrrr', id: 'e2e76afe-742b-48c7-ab36-db05dd18a1b9', userId: 'h0X8_-xtWaX5CSpQAAAD' },
	{ content: 'Nout Lu Yin Mr Pryor Naing Mr pr', id: '4ed070d5-8ca4-4c49-adf1-fb26b3ec6f17', userId: 'heRfRKHJOXfFpDRAAAAB' },
]
