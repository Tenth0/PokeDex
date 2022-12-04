import { useLayoutEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPoke } from './utils/data';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/navbar';

const App = () => {
    const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon'
    const [pokeData,setPokeData] = useState([])
    const [nextURL,setNextURL] = useState('')
    const [prevURL,setPrevURL] = useState('')
    useLayoutEffect (() => {
        const fetchPokeData = async () => {
            let res = await getAllPokemon(pokeApiURL)
            loadPoke(res.results)
            setNextURL(res.next)
            setPrevURL(res.previous)
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

    const handleNextPage = async () => {
        let data = await getAllPokemon(nextURL)
        await loadPoke(data.results)
        setPrevURL(data.previous)
        setNextURL(data.next)
    }

    const handlePrevPage = async () => {
        if(!prevURL) return;
        let data = await getAllPokemon(prevURL)
        await loadPoke(data.results)
        setPrevURL(data.previous)
        setNextURL(data.next)
    }

    return (
    <>
      <Navbar />
      <div className="App">
        <div className="cardContainer">
            {pokeData.map((poke,i) => {
                return <Card key={i} poke={poke} /> 
            })}
        </div>
      <div className="btn">
        <button onClick={handlePrevPage}>前へ</button>
        <button onClick={handleNextPage}>次へ</button>
      </div>
      </div>
    </>
    );
}

export default App;
