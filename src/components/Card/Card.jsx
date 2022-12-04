import React from 'react'
import './card.css'

const Card = ({poke}) => {
  return (
    <div className='card'>
      <div className="img">
        <img src={poke.sprites.front_default}/>
      </div>
      <div className="name">{poke.name}</div>
        <div>タイプ</div>
        {poke.types.map((type) => {
          return (
            <div className='typeName' key={type}>
              <span>{type.type.name}</span>
            </div>
          )
        })}
      <div className="Info">
        <div className="data">
          <p className='title'>重さ：{poke.weight}</p>
          <p className='title'>高さ：{poke.height}</p>
          <p className='title'>特性：{poke.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card