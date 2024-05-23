
const Course = ({course}) => {
    const sumaTotal = course.parts.reduce((total, num) => {
        return total + num.exercises
    }, 0)

    return(
        <div>
            <h1>{course.name}</h1>
            <div>
                {course.parts.map(part => 
                    <p key={part.id}>{part.name}{':'} {part.exercises}</p>
                )}
                <h3>total of {sumaTotal} exercises</h3>
            </div>
        </div>
    )
}

export default Course