import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './style/pokedex.css'
const Pokedex = () => {

  const { trainer } = useSelector(state => state)

  const [pokemons, setPokemons] = useState()
  const [types, setTypes] = useState()
  const [typeSelected, setTypeSelected] = useState('All pokemons')

  const navigate = useNavigate()
  useEffect(() => {
    if(typeSelected !== "All pokemons"){
      // hacer la petición de los pokemons por tipo
      axios.get(typeSelected)
        .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
        .catch(err => console.log(err))
    } else {
      // hacer la petición de todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  }, [typeSelected])

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const inp = e.target.search.value.trim().toLowerCase()
    navigate(`/pokedex/${inp}`)
  }

  const handleChange = e => {
    setTypeSelected(e.target.value)
    // setPage(1)
  }
// Lógica de paginación
const [page, setPage] = useState(1)
const [pokePerPage, setpokePerPage] = useState(12)
const initialPoke = (page - 1) * pokePerPage
const finalPoke = page * pokePerPage
const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

return (
  <div className='poke__container'>
    <h2 className="poke__title"><span className='poke__span'>Welcome {trainer}</span>, here you can find your favorite pokemon.</h2>
<section className='poke__section'>
    <form className="poke__form" onSubmit={handleSubmit}>
      <input className='poke__input' id='search' type="text" />
      <button className='poke__btn'>Search</button>
    </form>
    <select className='poke__select' onChange={handleChange}>
      <option value='All pokemons'>All pokemons</option>
      {
        types?.map(type => (
          <option key={type.url} value={type.url}>{type.name}</option>
        ))
      }
    </select>
    </section>

    <div className="pagination_container">

      <Pagination 
      page={page} 
      maxPage={maxPage}
      setPage={setPage}
      // setpokePerPage = {setpokePerPage}
    />
    </div>

    <div className='poke-container'>
      {
        pokemons?.slice(initialPoke, finalPoke).map(poke => (
          <PokeCard 
            key={poke.url} 
            url={poke.url}
          />
        ))
      }
    </div>

   <div  className="pagination_container">
    <Pagination 
      page={page} 
      maxPage={maxPage}
      setPage={setPage}
      />
      </div>
  </div>
)
}

export default Pokedex
