import { useEffect, useState } from "react";
import { useRef } from "react";
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const useSocket = (orderId) => {
    const [status, setStatus] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on('connect', () => {
            console.log('Connected to server');
            if (orderId) {
                socketRef.current.emit('join-order', orderId);
            }
        });

        socketRef.current.on('status-update', (data) => {
            console.log('Status update received:', data);
            setStatus(data);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [orderId]);

    return { status, socket: socketRef.current };
};