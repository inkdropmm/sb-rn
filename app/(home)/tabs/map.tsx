import { Flex, Pressable, Text, TextInput } from '@inkdropmm/ui'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import ActionSheet, { SheetProvider } from 'react-native-actions-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import { Socket, io } from 'socket.io-client'
import * as Location from 'expo-location'

const ACTIVITY_INVITE_EVE = 'activity.invite'
const ACTIVITY_ACCEPT_EVE = 'activity.accept'
const ACTIVITY_REJECT_EVE = 'activity.reject'

const userId = '662e34a254ba5a555930bf63'
const Page = () => {
	const [socket, setSocket] = useState<Socket>()
	const [invite, setInvite] = useState<any>()
	const [myInvite, setMyInvite] = useState<any>()
	const [connect, setConnect] = useState(false)
	const [fromUserId, setFromUserId] = useState('')
	const [toUserId, setToUserId] = useState('')
	const [location, setLocation] = useState<Location.LocationObject>()

	useEffect(() => {
		if (!(fromUserId && connect)) return
		const socket = io(`http://172.20.10.4:5050/s/activity`, { auth: { userId: fromUserId } })
		setSocket(socket)

		return () => {
			socket.disconnect()
		}
	}, [fromUserId, connect])

	useEffect(() => {
		if (!socket) return
		socket.on('activity', (data) => {
			console.log('activity event')
			switch (data.type) {
				case ACTIVITY_ACCEPT_EVE:
				case ACTIVITY_REJECT_EVE:
					console.log('user-', fromUserId, 'ar', data.id, myInvite?.id)
					if (data.id === myInvite?.id) setMyInvite(data)
					break
				case ACTIVITY_INVITE_EVE:
					console.log('user-', fromUserId, 'invite', data)
					setInvite(data)
					break
			}
		})
	}, [invite, myInvite, socket])
	// console.log('I am', fromUserId)
	// console.log('myInvite', myInvite)
	// console.log('invite', invite)

	const sheetRef = useRef<ActionSheet>(null)
	const mapRef = useRef<ActionSheet>(null)

	useEffect(() => {
		sheetRef.current?.show()
	}, [])

	useEffect(() => {
		const tmp = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				console.log('Permission to access location was denied')
				return
			}

			let loc = await Location.getCurrentPositionAsync({})
			mapRef.current.animateCamera({ center: { latitude: loc.coords.latitude, longitude: loc.coords.longitude } })

			console.log('loc>', loc)
			setLocation(loc)
		}
		tmp()
	}, [])

	return (
		// <SheetProvider>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1, flexWrap: 'wrap', padding: 0 }}>
				<MapView
					ref={mapRef}
					style={{ flex: 1, width: '100%' }}
					provider='google'
					region={{ latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0, latitudeDelta: 0.003, longitudeDelta: 0.003 }}
					showsUserLocation
					showsMyLocationButton
				/>

				<ActionSheet ref={sheetRef} containerStyle={{ padding: 12 }} snapPoints={[30, 80]} closable={false} isModal={false} gestureEnabled backgroundInteractionEnabled>
					<Text variant='caption' style={{ paddingVertical: 20 }}>
						userId - {userId}
					</Text>
					<View style={{ width: '100%' }}>
						<Flex style={{ gap: 8 }}>
							<TextInput placeholder='your id' value={fromUserId} onChangeText={setFromUserId} />
							<TextInput placeholder='his id' value={toUserId} onChangeText={setToUserId} />
						</Flex>
						<Pressable onPress={() => setConnect(true)} style={{ marginTop: 16, padding: 12, backgroundColor: '#006684ff', borderRadius: 4 }}>
							<Text style={{ color: '#fff', textAlign: 'center' }}>Connect</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								setMyInvite(null)
								socket?.emit(ACTIVITY_INVITE_EVE, { fromUserId, toUserId }, (res: any) => {
									console.log('user-', fromUserId, 'resMyInvite', res)
									setMyInvite(res)
								})
							}}
							style={{ marginTop: 16, padding: 12, backgroundColor: '#006684ff', borderRadius: 4 }}
						>
							<Text style={{ color: '#fff', textAlign: 'center' }}>Invite</Text>
						</Pressable>
					</View>

					{myInvite ? myInvite.accepted === null ? null : myInvite.accepted ? <Text>Accepted</Text> : <Text>Rejected</Text> : null}
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
										console.log('ainvite', invite)
										setInvite(null)
									}}
									style={{ flexGrow: 1, marginTop: 16, padding: 12, backgroundColor: '#006684ff', borderRadius: 4 }}
								>
									<Text style={{ color: '#fff', textAlign: 'center' }}>Accept</Text>
								</Pressable>
							</Flex>
						</View>
					)}
				</ActionSheet>
			</View>
		</GestureHandlerRootView>
		// </SheetProvider>
	)
}

export default Page
