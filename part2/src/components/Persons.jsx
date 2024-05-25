 

const Persons = (props) =>{
    return(
        <div>
            {props.newPersonsFilter.map(person =>     
                <p key={person.id}>
                    {person.name} {'---'} {person.number}  
                    <button onClick={() => props.deletePerson(person.id)}>delete</button>
                </p>
            )}
        </div>
    )
 }

 export default Persons