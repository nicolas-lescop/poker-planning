import Card from './Card'
import { useDroppable } from '@dnd-kit/core';

import styles from '../styles/Home.module.css'

export function getCardId(playerName, baseId) {
  return `${playerName.toLowerCase()}-${baseId}`;
}

export default function Deck({ cards, id }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div className={styles.deck} ref={setNodeRef}>
            {cards.filter(({ container }) => container === id ).map(({ content, playerName, id, draggable }) => {
              const cardId = getCardId(playerName, id);
              return <Card content={content} key={cardId} id={cardId} draggable={draggable} />;
            })}
        </div>
    );
}

