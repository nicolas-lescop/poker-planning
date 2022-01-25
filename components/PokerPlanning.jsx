import { useState, useEffect } from 'react'
import { DndContext } from '@dnd-kit/core';
import Deck, { getCardId } from '../components/Deck';

export default function PokerPlanning({ playerName, room, socket }) {
    const [cards, setCards] = useState([
      { id: '1', content: '1', playerName, container: 'deck', draggable: true },
      { id: '2', content: '2', playerName, container: 'deck', draggable: true },
      { id: '3', content: '5', playerName, container: 'deck', draggable: true },
      { id: '4', content: '8', playerName, container: 'deck', draggable: true },
      { id: '5', content: '13', playerName, container: 'deck', draggable: true },
      { id: '6', content: '21', playerName, container: 'deck', draggable: true },
      { id: '7', content: '🍵', playerName, container: 'deck', draggable: true },
      { id: '8', content: '?', playerName, container: 'deck', draggable: true },
    ]);

    const handleDragEnd = (event) => {
      if (!event.active.id.includes(playerName.toLowerCase())) return;

      const newCards = cards.map((card) => ({ ...card, draggable: event.over.id === 'deck' }));
      const activeCard = newCards.find(({ id, playerName }) => getCardId(playerName, id) === event.active.id);
      activeCard.container = event.over.id;
      activeCard.draggable = true;
      if (event.over.id === 'table') {
        console.log('Emit frere', socket);
        socket.emit('add-card-on-table', { room, card: activeCard });
      } else {
        socket.emit('remove-card-on-table', { room, card: activeCard });
      }
      newCards[newCards.indexOf(activeCard)] = activeCard;
      setCards(newCards);
    }

    useEffect(() => {
        socket.on('new-card-on-table', (newCard) => {
          newCard.draggable = false;
          setCards([...cards, newCard])
          console.log('New card frere', newCard);
        })
        socket.on('delete-card-on-table', (deletedCard) => {
          const cardsState = cards.filter(currentCard => getCardId(currentCard.playerName, currentCard.id) !== getCardId(deletedCard.playerName, deletedCard.id) )
          setCards(cardsState);
          console.log('Delete card frere', deletedCard);
        })
        socket.on('room-state', roomState => {
          console.log('Room state', roomState);
          const userCardsFromState = roomState.cards.filter((stateCard) => stateCard.playerName === playerName);
          const deck = cards.filter((card) => !userCardsFromState.some((stateCard) => card.id === stateCard.id ))
          setCards([...deck, ...roomState.cards])
        })
    }, []);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <Deck cards={cards} id="deck" />
            <Deck cards={cards} id="table" />
        </DndContext>
    );
}
