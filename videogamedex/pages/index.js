import React from 'react'
import GameCard from '../components/GameCard'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Pagination from '../components/Pagination'


export default function Home({games}) {
  console.log(games)
  return (
    <div>
      <NavBar/>
      <Pagination
      count={games.count}
      />

      <h1>All Games</h1>
      <div className={styles.gameContainer}>
        {
          games.results.map((game) => {
            return (
              <GameCard 
              name={game.name} 
              img={game.background_image} 
              slug={game.slug} 
              id={game.id} 
              metascore={game.metacritic}
              platform={game.parent_platforms}
              key={game.id} 
              />
            )
          })
          
        }
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6')
  const games = await res.json()

  return {
    props: {
      games
    }
  }
}
