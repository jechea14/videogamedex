import React, {useState, useRef, useCallback, useEffect} from 'react'
import GameCard from '../components/GameCard'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'

export default function Home({games}) {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("")
  const [isNextNull, setIsNextNull] = useState(false)

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
          json['next'] === null ? setIsNextNull(true) : setIsNextNull(false)
          console.log(isNextNull)

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
          json['next'] !== null ? setIsNextNull(false) : setIsNextNull(true)
          console.log(isNextNull)
        });
      setLoading(false)
    }

    if (debouncedSearch) getSearchItems();
    
  }, [debouncedSearch, nextPage])

  return (
    <div>
      <NavBar/>
      <div className={styles.inputContainer}>

        <input placeholder='Search 790k+ games' type="search" className={styles.searchbar} onChange={(e) => handleChange(e)}/>
      </div>
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
      <div className={styles.loadMoreBtnContainer}>
        {
          !isNextNull && <button className={styles.loadMoreBtn} onClick={handleNextPage}>Load More</button>
        }
        <div>{loading && 'Loading...'}</div>
      </div>
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
