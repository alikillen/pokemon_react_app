import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList"
import axios from "axios"
import Pagination from "./Pagination"

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  // setting up a state for the currentpage we are on
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
      // every time axios makes a call it sets cancel to canceltoken
    }).then(res=> {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p=> p.name))
    })

    return ()=> cancel()
    // makes sure cancels in case old req - our app doesnt load old data
  },[currentPageUrl])
  // array of args in this empty array normally - any of these args updated, it runs the effect again
  // the args signal when to update the app
  // each time currentpageurl changes, rerender it

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  } 

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return (    
    <>
    <PokemonList pokemon={pokemon}/>
    <Pagination
      gotoNextPage={nextPageUrl ? gotoNextPage : null}
      gotoPrevPage={prevPageUrl? gotoPrevPage : null}
      />
    </>
  );
}

export default App;

// using axios allows us to fetch from APIS