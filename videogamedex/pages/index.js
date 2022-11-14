import React, {useState, useRef, useCallback, useEffect} from 'react'
import GameCard from '../components/GameCard'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'

export default function Home({games}) {
  console.log(games)
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("")

  useEffect(() => {
    setLoading(true);
    const getNextGames = async () => {
      console.log(nextPage);
      const getGames = await fetch(
        `https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6&page=${nextPage}&search=${query}`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setData([...data, ...json['results']]);
        });
      setLoading(false);
    };
    console.log(data);
    getNextGames();
  }, [nextPage]);

  useEffect(() => {
    setData([])
  }, [query])

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
        setNextPage(1)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  const debouncedSearch = useDebounce(query, 500)

  const handleNextPage = () => {
    setNextPage(nextPage + 1);
  };

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    setLoading(true)
    const getSearchItems = async () => {
      const getGames = await fetch(
        `https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6&page=${nextPage}&search=${query}`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setData([...data, ...json['results']]);
        });
      setLoading(false)
      console.log(data)
    }

    if (debouncedSearch) getSearchItems();
    
  }, [debouncedSearch, nextPage])

  return (
    <div>
      <NavBar/>
      <input placeholder='Search 790k+ games' type="search" className={styles.searchbar} onChange={(e) => handleChange(e)}/>
      <div className={styles.gameContainer}>
        {data.map((game) => {
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
        })}

      </div>
      {
        !loading && <button onClick={handleNextPage}>Load More</button>
      }
      <div>{loading && 'Loading...'}</div>
    </div>
  );
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
