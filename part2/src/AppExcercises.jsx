
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countrieServices from './services/countries'
import Countries from './components/Countries'
import Countrie from './components/Countrie'

const AppExcercises = () => {
    const [newFilter, setNewFilter] = useState('')
    const [countries, setNewCountries] = useState(null)
    const [countriesByName, setNewCountriesByName] = useState(null)
    const [showCountry, setShowCountry] = useState(false)
    const [countryToShow, setCountrieToShow] = useState(false)

    useEffect(() => {
        countrieServices
            .getAll()
            .then(countries => {
                setNewCountries(countries)
                setNewCountriesByName(countries)
            })
    },[])

    const handleNewFilter = (event) => {
        const newFilterValue = event.target.value
        setNewFilter(newFilterValue)

        setShowCountry(false)

        const countriesByNameFiltered = countries.filter(countrie => countrie.name.common.toLowerCase().includes(newFilterValue.toLowerCase()))      
        setNewCountriesByName(countriesByNameFiltered)
    }

    const checkLenght = () => {
        console.log(Object.keys(countriesByName).length)
        
        if(Object.keys(countriesByName).length === 1){
            return <Countrie countrie={countriesByName[0]} />
        } 
        else {
            if(Object.keys(countriesByName).length <= 10){
                return <Countries countries={countriesByName} showCountrie={showCountrie} />
            }
            else {
                return <p>Too many matches, specify another filter</p>
            }
        } 

    }

    const showCountrie = (countrie) => {
        setShowCountry(true)
        setCountrieToShow(countrie)
    }


    if(countries !== null){
        return (
            <div>
                <Filter text={'find countries '} newFilter={newFilter} handleFilterChange={handleNewFilter} />
                <div>
                    {checkLenght()}
                </div>
                <div>
                    {showCountry ? (
                        <Countrie countrie={countryToShow} />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div> 
        )
    }
    else{
        return <p>Loading...</p>
    }
}

export default AppExcercises