import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/Navbar.module.css'
import {HiOutlineMenu} from 'react-icons/hi'
import {MdClose} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import GameCard from './GameCard'

const NavBar = () => {

  const [mobileNavShown, setMobileNavShown] = useState(false)

  const handleNavbar = () => {
    setMobileNavShown(!mobileNavShown)
  }


  return (
    <nav className={styles.nav}>
        <div className={styles.navtitle}>
            <Link href='/'>VideoGameDex</Link>
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