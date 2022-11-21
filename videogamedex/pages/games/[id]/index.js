import NavBar from '../../../components/NavBar.js'
import Image from 'next/image'
import styles from '../../../styles/GamePage.module.css'
import InfoCard from '../../../components/InfoCard.jsx'
import Metascore from '../../../components/Metascore.js'

const games = ({game}) => {
    console.log(game)

    return (
        <div className={styles.container}>
          <NavBar/>
          <h1>{game.name}</h1>

          <div className={styles.imgContainer}>
            <Image 
              src={game.background_image} 
              alt={game.name} 
              width={4000} 
              height={2500} 
              loading="lazy"
            />
            {
              game.background_image_additional === null ? 
              <></> : <Image 
                      src={game.background_image_additional} 
                      alt={game.name} 
                      width={4000} 
                      height={2500} 
                      loading="lazy"
                      />
            }
          </div>

          <div className={styles.bodyContainer}>
            <div className={styles.infoCard}>
              <InfoCard title={"About"} desc={game.description_raw}/>
            </div>

            <div className={styles.detailContainer}>
              <div className={styles.infoCard}>
                <h2>Metascore</h2>
                <Metascore metascore={game.metacritic}/>
              </div>
              <div className={styles.infoCard}>
                <h2>Genre</h2>
                {
                  game.genres.map((genre) => {
                    return <p key={genre.name}>{genre.name}</p>
                  })
                }
              </div>
              <div className={styles.infoCard}>
                <h2>Platforms</h2>
                {
                  game.platforms.map((platform) => {
                    return <p key={platform.platform.name}>{platform.platform.name}</p>
                  })
                }
              </div>
              <div className={styles.infoCard}>
                <InfoCard title={"Release Date"} desc={game.released}/>
              </div>

            </div>

          </div>

          <div className={styles.creaters}>
            <div className={styles.infoCard}>
              <h2>Publisher</h2>
              {
                game.publishers.map((publisher) => {
                  return <p key={publisher.name}>{publisher.name}</p>
                })
              }
            </div>
            <div className={styles.infoCard}>
              <h2>Developer</h2>
              {
                game.developers.map((developer) => {
                  return <p key={developer.name}>{developer.name}</p>
                })
              }
            </div>
            <div className={styles.infoCard}>
              <h2>Website</h2>
              <a href={game.website} target="_blank" rel="noreferrer">{game.website}</a>
            </div>
          </div>
        </div>
      )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`https://api.rawg.io/api/games/${context.params.id}?key=56900b065e5d4c2d923515e904b9edb6`)
    const game = await res.json()
  
    return {
      props: {
        game
      }
    }
  }

export default games