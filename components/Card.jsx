import styles from '../styles/Home.module.css'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const DraggableCard = ({ content, id }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
    const style = { transform: CSS.Translate.toString(transform) }
    return (
        <button className={styles.card} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {content}
        </button>
    )
}

export default function Card(props) {
    const BasicCard = () => <button className={styles.card}>{props.content}</button>
    return props.draggable ? <DraggableCard {...props} /> : <BasicCard />;
}
