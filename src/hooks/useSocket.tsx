import { getIpAddressAsync } from 'expo-network'
import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>

const connectSocket = (socket: SocketType): Promise<SocketType> => {
	return new Promise((resolve) => setTimeout(() => resolve(socket), 50))
}

const useSocket = (data: any) => {
	const [socket, setSocket] = useState<SocketType>()
	const [ready, setReady] = useState(false)

	useEffect(() => {
		console.log('ipuseeffect', data)
		getIpAddressAsync().then(async (ip) => {
			// const s = await connectSocket(io(`http://${ip}:5050`, { auth: { userId: data.userId } }))
			setSocket(io(`http://${ip}:5050`, { auth: { userId: data.userId } }))
			setReady(true)
		})
	}, [])

	return [socket, ready] as [SocketType, boolean]
}

export default useSocket
