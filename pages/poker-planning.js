import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import io from 'socket.io-client'

import PokerPlanning from '../components/PokerPlanning';
import styles from '../styles/Home.module.css'

export default function PokerPlanningPage() {
    const router = useRouter();
    const [socket, setSocket] = useState();
    const playerName = router.query.playerName;
    const room = router.query.room;

    useEffect(() => {
      if (room && playerName) {
        const socket = io('ws://localhost:3002');
        socket.on("connect", () => {
            socket.emit('join-room', { playerName,  room });
            setSocket(socket);
            console.log('User connected', socket.id);
        });
        socket.on("disconnect", () => {
            console.log('User disconnected');
        });
      }
    }, [room, playerName]);

    if (router.isReady && socket) {
        return (
            <div className={styles.container}>
            <Head>
                <title>Poka planning Motha Fucka</title>
                <meta name="description" content="Poka planning Motha Fucka" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>

                <h2>Welcome {playerName}</h2>
                <PokerPlanning playerName={playerName} room={room} socket={socket} />

            </main>
            </div>
        )
    }

    return (<>Loading...</>);
}
