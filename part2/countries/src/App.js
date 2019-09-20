import React, {useState, useEffect} from 'react';
import axios from 'axios';




const Filter = ({newSearch, setNewSearch, setCountries}) => {
  const changeHandler = (e) => setNewSearch(e.target.value)

  useEffect ( () => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => response.data)
        .then(array => array.filter(item => item.name.toLowerCase().includes(newSearch.toLowerCase())))
        .then(results => setCountries(results))
  }, [newSearch])

  return (
    <div>
      find countries <input type='text' value={newSearch} onChange={changeHandler}/>
    </div>
    
  )
}


const CountryDetail = ({country}) => {
  const rows = () => country.languages.map(language => <li key={language.name}>{language.name}</li>)

  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <p>languages</p>
      <ul>
        {rows()}
      </ul>
      <img src={country.flag} height='200px'/>
    </div>
  )
}

const Results = ({countries, setNewSearch}) => {
  const showHandler = (e) => {
    let element = e.target;
    let parent = element.parentNode;
    setNewSearch(parent.firstChild.data)
  }

  const rows = () => countries.map(country => <p key={country.name}>{country.name} <button onClick={showHandler}>show</button></p>)

  if (countries.length > 10){
    return(
      <p>Too many results. Please refine search.</p>
    )
  }else if (countries.length <= 10 && countries.length >1){
    return (
      rows()
    )
  } else if (countries.length ===1){
    return (
      <CountryDetail country={countries[0]}/>
    )
  } else{
    return (
      <p>No countries match that criteria.</p>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([
    {name: 'Ooko'},
    {name: 'Mallon'}

  ])
  const [newSearch, setNewSearch] = useState('')


  


  return (
    <div className="App">
      <Filter 
        newSearch={newSearch}
        setNewSearch={setNewSearch}
        countries={countries}
        setCountries={setCountries} />
      <Results 
        setNewSearch={setNewSearch}
        countries={countries}
        setCountries={setCountries} />
    </div>
  );
}

export default App;
