import GameInfo from "../../../components/GameInfo"
import styles from '../../../styles/GameInfo.module.css'

const games = ({game}) => {
    console.log(game)

    return (
      <div>
        <h1>{game.name}</h1>
        <p>{game.description_raw}</p>
        <div>
          <h2>Genre</h2>
          {
            game.genres.map((genre) => {
              return <p key={genre.name}>{genre.name}</p>
            })
          }
        </div>
        <div>
          <h2>Platforms</h2>
          {
            game.platforms.map((platform) => {
              return <p key={platform.platform.name}>{platform.platform.name}</p>
            })
          }
        </div>
        <div>
          <h2>Release Date</h2>
          <p>{game.released}</p>
        </div>
        <div>
          <h2>Metascore</h2>
          <p>{game.metacritic}</p>
        </div>
        <div>
          <h2>Publisher</h2>
          {
            game.publishers.map((publisher) => {
              return <p key={publisher.name}>{publisher.name}</p>
            })
          }
        </div>
        <div>
          <h2>Developer</h2>
          {
            game.developers.map((developer) => {
              return <p key={developer.name}>{developer.name}</p>
            })
          }
        </div>
        <div>
          <h2>Website</h2>
          <a href={game.website} target="_blank" rel="noreferrer">{game.website}</a>
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