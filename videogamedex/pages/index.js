import React, {useState, useRef, useCallback, useEffect} from 'react'
import GameCard from '../components/GameCard'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Pagination from '../components/Pagination'


export default function Home({games}) {
  console.log(games)

  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const observer = useRef()

  const lastElement = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    setLoading(true);
    const getStaticProps = async () => {
      const res = await fetch('https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6')
      const games = await res.json()
    
      return {
        props: {
          games
        }
      }
    }
    setLoading(false)
    setHasMore((prevGames) => {
      return
    })
    
  })

  return (
    <div>
      <NavBar/>
      {/* <Pagination
      count={games.count}
      /> */}

      <h1>All Games</h1>
      <div className={styles.gameContainer}>
        {
          games.results.map((game, index) => {
            if(games.length === index + 1) {
              return (
                <div ref={lastElement}>
                  <GameCard 
                  name={game.name} 
                  img={game.background_image} 
                  slug={game.slug} 
                  id={game.id} 
                  metascore={game.metacritic}
                  platform={game.parent_platforms}
                  key={game.id} 
                  />
                </div>
              )
            }
            else {
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
            }
          })
        }
      </div>
      <div>{loading && 'Loading...'}</div>
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
