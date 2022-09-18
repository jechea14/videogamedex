
const games = ({game}) => {
    const tagRegExp =  new RegExp('<\s*[^>]*>', 'g')
    game.description = game.description.replace(tagRegExp, '')
    
    return <div>{game.description}</div>
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