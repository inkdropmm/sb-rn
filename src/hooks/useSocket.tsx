import { getIpAddressAsync } from 'expo-network'
import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>

const useSocket = () => {
	const [socket, setSocket] = useState<SocketType>()
	const [ready, setReady] = useState(false)

	useEffect(() => {
		getIpAddressAsync().then((ip) => {
			setSocket(io(`http://${ip}:5050`))
			setReady(true)
		})
	}, [])

	return [socket, ready] as [SocketType, boolean]
}

export default useSocket
