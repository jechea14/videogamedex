import React, {useState, useRef, useCallback, useEffect} from 'react'
import GameCard from '../components/GameCard'
import styles from '../styles/Home.module.css'
import axios from 'axios'

import NavBar from '../components/NavBar'

export default function Home({games}) {
  console.log(games)

  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const observer = useRef()

  const [mobileNavShown, setMobileNavShown] = useState(false)
  
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
        setPage(1)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  const debouncedSearch = useDebounce(query, 500)

  const lastElement = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      console.log("in", entries);
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPageNumber) => prevPageNumber + 1);
      }
    })
    console.log("node", node);
    if (node) observer.current.observe(node)
  }

  console.log("observer", observer)

  useEffect(() => {
    setData([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    const getSearchItems = async () => {
      const games = await axios.get(`https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6&page=${page}&search=${query}`)
      console.log(games)
      setLoading(false)
      setHasMore(games.data.results.length > 0)
      setData((prev) => {
        return [...new Set([...prev, ...games.data.results.map((game) => <GameCard 
          name={game.name} 
          img={game.background_image} 
          slug={game.slug} 
          id={game.id} 
          metascore={game.metacritic}
          platform={game.parent_platforms}
          key={game.id} 
          />)])]
      })
      console.log(data)
    }

    if (debouncedSearch) getSearchItems();
    
  }, [debouncedSearch, page])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const shouldStartSearch = query.length > 0

  return (
    <div>
      <NavBar/>
      <input placeholder='Search 790k+ games' type="search" className={styles.searchbar} onChange={(e) => handleChange(e)}/>
      <div className={styles.gameContainer}>

      {
        shouldStartSearch ? data.map((game, index) => {
          
          return <div key={index} ref={lastElement}>{game}</div>
        }) : <div>      <h1>All Games</h1>
        
          {
            games.results.map((game, index) => {
              if(games.length === index + 1) {
                return (
                  <div ref={lastElement} key={game.id}>
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

      }
      </div>
          {/* <div className={debouncedSearch}>
            {
              shouldStartSearch &&

              data.map((game, index) => {
                return <div key={index} ref={lastElement}>{game}</div>
              })
            }
          </div> */}

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
