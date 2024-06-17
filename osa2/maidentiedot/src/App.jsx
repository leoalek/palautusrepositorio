import { useState,useEffect } from 'react'
import countryService from './services/coutries'

const Filter = (props) => {
  return(
    <div>
      <form>
        <div>
          find countries <input value={props.filter} onChange={props.handleFilter}/>
        </div>
      </form>
    </div>
  )
}

// list of countries
const Countries = (props) => {
  const filteredCountries = props.countries.filter(country => country.toLowerCase().includes(props.filter.toLowerCase()))
  
  return(
    <div>
      {filteredCountries.length > 10 ? (
        <>Too many matches, specify another filter</>) : filteredCountries.length === 1 ? (
          <div>
          <CountryData countryName={filteredCountries}></CountryData>
          </div>
        ):(
          <ul>
            {filteredCountries.map(country => 
              <li key={country}>
                {country}
                <button value={country} onClick={props.handleShowbutton}>show</button>
              </li>
            )}
          </ul>
        )
      }
    </div>
  )
}

// data from singular country
const CountryData = (props) =>{
  const [country,setCountry] = useState(null)

  //get data for the country
  useEffect(()=>{
      countryService.getCountry(props.countryName).then(thatCountry => {
        setCountry(thatCountry)
      })
  },[props.countryName])

  return(
    <div>
      {country ? (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h3>languages</h3>
          <ul className='languages'>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
          <div>
            <img className='flag' src={Object.values(country.flags)[0]} alt='flag'></img>
          </div>
        </div>
      ) : (
        <p>fetching data...</p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter,setFilter] = useState('')
  const [countryName, setCountryName] = useState(null)

  useEffect(() => {
    countryService
    .getAll()
    .then(initCountires => {
      setCountries(initCountires.map(country => country.name.common))
    })
  },[])

  // sets countryName to null when filter/search is changed
  useEffect(() => {
    if(countryName){
      setCountryName(null)
    }
  },[filter])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleShowbutton = (event) => {
    setCountryName(event.target.value)
  }

    return(
      <div>
      <Filter filter={filter} handleFilter={handleFilter}></Filter>
      {countryName ? (
        // When show button is pressed
        <CountryData countryName={countryName}></CountryData>
      ):(
        <Countries countries={countries} filter={filter} handleShowbutton={handleShowbutton}></Countries>
      )}
    </div>
    )
}

export default App
