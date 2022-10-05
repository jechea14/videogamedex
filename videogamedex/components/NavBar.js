import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import styles from '../styles/Navbar.module.css'
import {AiOutlineMenu} from 'react-icons/ai'

const NavBar = () => {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observer = useRef()

  const lastElement = (node) => {

  }

  useEffect(() => {
    setData([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    const getSearchItems = async () => {
      const games = await axios.get(`https://api.rawg.io/api/games?key=56900b065e5d4c2d923515e904b9edb6&page=${page}&search=${query}`)
      console.log(games)
      setLoading(false)
      setData((prev) => {
        return [...new Set([...prev, ...games.data.results.map((game) => game.name)])]
      })
    }

    getSearchItems()
  }, [query, page])


  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <nav className={styles.nav}>
        <div className={styles.navtitle}>
            <h1>VideoGameDex</h1>
        </div>
        <div className={styles.searchContainer}>
          <input placeholder='Search 790k+ games' type='text' className={styles.searchbar} onChange={(e) => handleChange(e)}/>
          {/* {
            data.map((game, index) => {
              if(data.length === index + 1) {
                return <div key={index} ref={lastElement} className={styles.searchTitle}>{game}</div>
              }
              else {
                return <div key={index} className={styles.searchTitle}>{game}</div>
              }
              
            })
          } */}
        </div>
        <div className={styles.mobileNav}>
          <AiOutlineMenu size={35}/>
        </div>
    </nav>
  )
}

export default NavBar