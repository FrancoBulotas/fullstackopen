

const Anecdote = ({anecdote}) => {

    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p><strong>Author:</strong> {anecdote.author}</p>
            <p><strong>URL:</strong> {anecdote.info}</p>
            <p><strong>Votes:</strong> {anecdote.votes}</p>
        </div>
    )
}

export default Anecdote