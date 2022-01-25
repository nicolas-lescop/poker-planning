import { useState } from 'react';

export default function Coucou({ data }) {
    const [message, setMessage] = useState('Coucou');
    const click = () => {
        setMessage(`Coucou ${data.name}`);
    }

    return (
        <div>
            <p>{message}</p>
            <button onClick={click}>Click {data.name}</button>
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/hello')
    const data = await res.json()
    return { props: { data }, revalidate: 60 }
}
