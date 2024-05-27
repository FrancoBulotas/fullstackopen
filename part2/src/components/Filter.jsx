

const Filter = (props) => {
    return(
        <div>
            {props.text} <input value={props.newFilter} onChange={props.handleFilterChange} />
        </div>
    )
}

export default Filter