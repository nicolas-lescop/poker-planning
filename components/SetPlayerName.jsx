import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkToRoom = ({ playerName, room }) => (
    <Link href={{ pathname: '/poker-planning', query: { playerName, room }}}>Rejoindre le poker planning</Link>
)
const LinkToAddNewRoom = ({ onAddNewRoom }) => (
    <button onClick={onAddNewRoom}>Créer un nouveau poker planning</button>
)
const PlayerNameForm = ({ playerName, onChangePlayerName }) => (
    <input placeholder="Player name" value={playerName} onChange={onChangePlayerName} />
)
const CreateRoomForm = ({ room, onChangeRoomName }) => (
    <input placeholder="Room name" value={room} onChange={onChangeRoomName} />
)

export default function SetPlayerName() {
    const router = useRouter();
    const joinRoom = router.query.room;
    const [playerName, setPlayerName] = useState('');
    const [room, setRoom] = useState(joinRoom);
    const handleChangePlayerName = (event) => setPlayerName(event.target.value);
    const handleChangeRoomName = (event) => setRoom(event.target.value);
    const handleAddNewRoom = () => {
      router.push({
        pathname: '/',
        query: {
          room
        }
      })
    }

    if (joinRoom) {
        return (
            <>
                <PlayerNameForm playerName={playerName} onChangePlayerName={handleChangePlayerName} />
                <LinkToRoom playerName={playerName} room={room} />
            </>
        );
    } else {
        return (
            <>
                <CreateRoomForm room={room} onChangeRoomName={handleChangeRoomName} />
                <LinkToAddNewRoom onAddNewRoom={handleAddNewRoom} />
            </>
        );
    }

}
