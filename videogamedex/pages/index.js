import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import GameCard from '../components/GameCard'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'

export default function Home({games}) {
  console.log(games)
  return (
    <div>
      <NavBar/>
      <div className={styles.gameContainer}>
        {
          games.results.map((game) => {
            return (
              <GameCard 
              name={game.name} 
              img={game.background_image} 
              slug={game.slug} 
              id={game.id} 
              key={game.id} 
              />
            )
          })
        }
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6')
  const games = await res.json()
  // const gameResults = games.results


  return {
    props: {
      games
    }
  }
}
