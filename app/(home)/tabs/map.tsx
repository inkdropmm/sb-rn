import { Flex, Pressable, Text, TextInput } from '@inkdropmm/ui'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Socket, io } from 'socket.io-client'

const ACTIVITY_INVITE_EVE = 'activity.invite'
const ACTIVITY_ACCEPT_EVE = 'activity.accept'
const ACTIVITY_REJECT_EVE = 'activity.reject'

const userId = '662e34a254ba5a555930bf63'
const Page = () => {
	const [socket, setSocket] = useState<Socket>()
	const [invite, setInvite] = useState<any>()
	const [connect, setConnect] = useState(false)
	const [fromUserId, setFromUserId] = useState('')
	const [toUserId, setToUserId] = useState('')

	useEffect(() => {
		if (!(fromUserId && connect)) return
		const socket = io(`http://172.20.10.4:5050`, { auth: { userId: fromUserId } })
		setSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [fromUserId, connect])

	useEffect(() => {
		if (!socket) return
		socket.on('activity', (data) => {
			if (data.type === ACTIVITY_INVITE_EVE || data.id === invite?.id) {
				setInvite(data)
			}
		})
	}, [invite, socket])

	return (
		<View style={{ flex: 1, flexWrap: 'wrap', padding: 12 }}>
			<Text variant='caption' style={{ paddingVertical: 20 }}>
				userId - {userId}
			</Text>
			<View style={{ width: '100%', marginBottom: 40 }}>
				<Flex style={{ gap: 8 }}>
					<TextInput placeholder='your id' value={fromUserId} onChangeText={setFromUserId} />
					<TextInput placeholder='his id' value={toUserId} onChangeText={setToUserId} />
				</Flex>
				<Pressable onPress={() => setConnect(true)} style={{ marginTop: 16, padding: 12, backgroundColor: '#006684ff', borderRadius: 4 }}>
					<Text style={{ color: '#fff', textAlign: 'center' }}>Connect</Text>
				</Pressable>
				<Pressable
					onPress={() => socket?.emit(ACTIVITY_INVITE_EVE, { fromUserId, toUserId })}
					style={{ marginTop: 16, padding: 12, backgroundColor: '#006684ff', borderRadius: 4 }}
				>
					<Text style={{ color: '#fff', textAlign: 'center' }}>Invite</Text>
				</Pressable>
			</View>

			{invite?.type === ACTIVITY_ACCEPT_EVE && <Text>Accepted</Text>}
			{invite?.type === ACTIVITY_REJECT_EVE && <Text>Rejected</Text>}
			{invite?.type === ACTIVITY_INVITE_EVE && invite.fromUserId !== fromUserId && (
				<View style={{ padding: 8, borderWidth: 2, borderColor: '#ccc' }}>
					<Text variant='title'>{`${invite.fromUserId} want to connect`}</Text>
					<Flex style={{ gap: 8 }}>
						<Pressable
							onPress={() => {
								socket?.emit(ACTIVITY_REJECT_EVE, { ...invite, accepted: false })
								setInvite(null)
							}}
							style={{ flexGrow: 1, marginTop: 16, padding: 12, backgroundColor: '#f00', borderRadius: 4 }}
						>
							<Text style={{ color: '#fff', textAlign: 'center' }}>Reject</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								socket?.emit(ACTIVITY_ACCEPT_EVE, { ...invite, accepted: true })
								setInvite(null)
							}}
							style={{ flexGrow: 1, marginTop: 16, padding: 12, backgroundColor: '#006684ff', borderRadius: 4 }}
						>
							<Text style={{ color: '#fff', textAlign: 'center' }}>Accept</Text>
						</Pressable>
					</Flex>
				</View>
			)}
		</View>
	)
}

export default Page
