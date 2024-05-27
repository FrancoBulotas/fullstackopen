

const Countrie = ({countrie}) => {      

    const languages = Object.values(countrie.languages)

    return (
        <div>
            <h1>{countrie.name.common}</h1>
            <p>Capital: {countrie.capital[0]}</p>
            <p>Area: {countrie.area}</p>
            <h2>languages:</h2>
            <ul>
                {languages.map(lan => 
                    <li key={lan}>
                        {lan}
                    </li>
                )}
            </ul>
            <img src={countrie.flags.png} />
        </div>
    )

}

export default Countrie