import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import styles from '../styles/Navbar.module.css'
import {HiOutlineMenu} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'

const NavBar = () => {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observer = useRef()

  const [mobileNavShown, setMobileNavShown] = useState(false)

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
            <a href='/'>VideoGameDex</a>
        </div>
        <div className={styles.searchContainer}>
          <input placeholder='Search 790k+ games' type='text' className={styles.searchbar} onChange={(e) => handleChange(e)}/>
          {/* {
            shouldStartSearch &&

            data.map((game, index) => {
              if(data.length === index + 1) {
                return (
                  <div className={styles.searches}>

                    <div key={index} ref={lastElement} className={styles.searchTitle}>{game}</div>
                  </div>
                )
              }
              else {
                return <div key={index} className={styles.searchTitle}>{game}</div>
              }
              
            })
          } */}
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