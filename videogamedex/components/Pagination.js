import React from 'react'

const Pagination = ({count}) => {

  const totalPages = Math.ceil(count / 20)
  
  const Asa = () => {

    for(let i = 0; i < 10; i++) {
      
      return <div>{i}</div>

    }
  }

  return (
    <>
      <div>
        {count}
      </div>
      <div>
        {totalPages}
      </div>
      <div>
        {Asa()}
      </div>
    </>
  )
}

export default Pagination