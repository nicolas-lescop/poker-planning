import { useEffect, useState } from 'react'
import Link from 'next/link';

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

export default function SetPlayerName({ joinRoom }) {

    const [playerName, setPlayerName] = useState('');
    const [displayCreateRoomForm, setDisplayCreateRoomForm] = useState(false);
    const [room, setRoom] = useState(joinRoom);
    const handleChangePlayerName = (event) => setPlayerName(event.target.value);
    const handleChangeRoomName = (event) => setRoom(event.target.value);
    const handleAddNewRoom = () => setDisplayCreateRoomForm(true);

    useEffect(() => {
        if (joinRoom !== room) {
            setRoom(joinRoom);
            setDisplayCreateRoomForm(true);
        }
    }, [joinRoom]);

    if (displayCreateRoomForm) {
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
