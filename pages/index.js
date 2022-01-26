import Head from 'next/head'

import SetPlayerName from '../components/SetPlayerName';
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Poka planning Motha Fucka</title>
        <meta name="description" content="Poka planning Motha Fucka" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <SetPlayerName />

      </main>
    </div>
  )
}
