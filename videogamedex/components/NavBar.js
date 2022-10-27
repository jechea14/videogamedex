import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/Navbar.module.css'
import {HiOutlineMenu} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'

const NavBar = () => {
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
        return [...new Set([...prev, ...games.data.results.map((game) => <Link href='/games/[id]' as={`/games/${game.slug}`} key={game.id}>{game.name}</Link>)])]
      })
    }

    if (debouncedSearch) getSearchItems();
    
  }, [debouncedSearch, page])

  const handleNavbar = () => {
    setMobileNavShown(!mobileNavShown)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const shouldStartSearch = query.length > 0


  return (
    <nav className={styles.nav}>
        <div className={styles.navtitle}>
            <Link href='/'>VideoGameDex</Link>
        </div>
        <div className={styles.searchContainer}>
          <input placeholder='Search 790k+ games' type="search" className={styles.searchbar} onChange={(e) => handleChange(e)}/>
          <div className={debouncedSearch && styles.searches}>
            {
              shouldStartSearch &&

              data.map((game, index) => {
                if(data.length === index + 1) {
                  return <div key={index} ref={lastElement} className={styles.searchTitle}>{game}</div>
                }
                else {
                  return <div key={index} className={styles.searchTitle}>{game}</div>
                }
              })
            }
          </div>
        </div>


        <div className={styles.mobileNav} onClick={handleNavbar}>
          {
            !mobileNavShown ? <HiOutlineMenu size={35}/> : <MdClose size={35}/>
          }

          {/* inside div so the menu closes upon click */}
          <ul className={!mobileNavShown ? styles.hidden : styles.mobileNavPopup}>
            <li>Home</li>
            <li>.</li>
          </ul>
        </div>
    </nav>
  )
}

export default NavBar