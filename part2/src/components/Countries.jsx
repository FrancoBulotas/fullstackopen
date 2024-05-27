
const Countries = (props) => {  
    return (
        <ul>
            {props.countries.map(countrie => 
                    <li key={countrie.name.common}>
                        {countrie.name.common} <button onClick={() => props.showCountrie(countrie)}>show</button>
                    </li>
                )
            }
        </ul>
    )    
}

export default Countries