import { useState, useEffect, useReducer } from 'react'
import { DndContext } from '@dnd-kit/core';
import Deck, { getCardId } from '../components/Deck';

function cardsReducer(cards, action) {
  if (action.type === 'add') {
    const newCard = action.payload;
    newCard.draggable = false;
    return [...cards, newCard];
  }
  if (action.type === 'remove') {
    const deletedCard = action.payload;
    return cards.filter(currentCard => getCardId(currentCard.playerName, currentCard.id) !== getCardId(deletedCard.playerName, deletedCard.id) )
  }
  if (action.type === 'init') {
    const roomState = action.payload.roomState;
    const playerName = action.payload.playerName;
    const userCardsFromState = roomState.cards.filter((stateCard) => stateCard.playerName === playerName);
    const deck = cards.filter((card) => !userCardsFromState.some((stateCard) => card.id === stateCard.id ));
    console.log([...deck, ...roomState.cards]);
    return [...deck, ...roomState.cards];
  }
  if (action.type === 'dragged') {
    const playerName = action.payload.playerName;
    const room = action.payload.room;
    const event = action.payload.event;
    const socket = action.payload.socket;
    if (!event.active.id.includes(playerName.toLowerCase())) return;
    const newCards = cards.map((card) => ({ ...card, draggable: event.over.id === 'deck' }));
    const activeCard = newCards.find(({ id, playerName }) => getCardId(playerName, id) === event.active.id);
    if (activeCard.container === event.over.id) return;
    activeCard.container = event.over.id;
    activeCard.draggable = true;
    if (event.over.id === 'table') {
      console.log('Emit frere', socket);
      socket.emit('add-card-on-table', { room, card: activeCard });
    } else {
      socket.emit('remove-card-on-table', { room, card: activeCard });
    }
    newCards[newCards.indexOf(activeCard)] = activeCard;
    return newCards;
  }
}

export default function PokerPlanning({ playerName, room, socket }) {
  const initialState = [
    { id: '1', content: '1', playerName, container: 'deck', draggable: true },
    { id: '2', content: '2', playerName, container: 'deck', draggable: true },
    { id: '3', content: '5', playerName, container: 'deck', draggable: true },
    { id: '4', content: '8', playerName, container: 'deck', draggable: true },
    { id: '5', content: '13', playerName, container: 'deck', draggable: true },
    { id: '6', content: '21', playerName, container: 'deck', draggable: true },
    { id: '7', content: '🍵', playerName, container: 'deck', draggable: true },
    { id: '8', content: '?', playerName, container: 'deck', draggable: true },
  ];
  const [cards, setCards] = useReducer(cardsReducer, initialState);

  const handleDragEnd = (event) => {
    setCards({
      type: 'dragged',
      payload: {
        playerName,
        room,
        event,
        socket,
      },
    });
  }

  useEffect(() => {
    socket.on('new-card-on-table', (newCard) => {
      setCards({
        type: 'add',
        payload: newCard,
      });
      console.log('New card frere', newCard);
    })
    socket.on('delete-card-on-table', (deletedCard) => {
      setCards({
        type: 'remove',
        payload: deletedCard,
      });
      console.log('Delete card frere', deletedCard);
    })
    socket.on('room-state', roomState => {
      setCards({
        type: 'init',
        payload: {
          playerName,
          roomState,
        },
      });
      console.log('Room state', roomState);
    })
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <Deck cards={cards} id="deck" />
        <Deck cards={cards} id="table" />
    </DndContext>
  );
}
