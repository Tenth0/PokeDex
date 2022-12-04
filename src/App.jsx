import { useLayoutEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPoke } from './utils/data';
import Card from './components/Card/Card';

const App = () => {
    const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon'
    const [pokeData,setPokeData] = useState([])
    useLayoutEffect (() => {
        const fetchPokeData = async () => {
            let res = await getAllPokemon(pokeApiURL)
            loadPoke(res.results)
        }
        fetchPokeData()
    },[])

    const loadPoke = async (data) => {
        let _pokeData = await Promise.all(
            data.map((poke) => {
                const url = poke.url
                let pokeRecord = getPoke(url)
                return pokeRecord
            })
        )
        setPokeData(_pokeData)   
    }
    console.log(pokeData)
    return (
      <div className="App">
        <h1>ポケモンのデータを取得しました</h1>
        <div className="cardContainer">
            {pokeData.map((poke,i) => {
                return <Card key={i} poke={poke} /> 
            })}
        </div>
      </div>
    );
}

export default App;
