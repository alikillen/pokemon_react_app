import React from 'react'

export default function PokemonList({pokemon}) {
  // /destructuring small params from props - pokemon
  return (
    <div>
      {pokemon.map(p => (
        
        <div key={p}>
          {p}
        </div>
      ))}
    </div>
  )
}
// react needs keys in the parent element when you loop
