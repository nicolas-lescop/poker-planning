import Head from 'next/head'
import { useRouter } from 'next/router'

import SetPlayerName from '../components/SetPlayerName';
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Poka planning Motha Fucka</title>
        <meta name="description" content="Poka planning Motha Fucka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <SetPlayerName joinRoom={router.query.joinRoom} />

      </main>
    </div>
  )
}
