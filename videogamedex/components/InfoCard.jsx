import React from 'react'

const InfoCard = ({title, desc}) => {
  return (
    <div>
        <h2>{title}</h2>
        <p>{desc}</p>
    </div>
  )
}

export default InfoCard