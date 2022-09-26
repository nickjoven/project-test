import SimplePitchCell from "./SimplePitchCell"

const SimplePitchRow = ({ row }) => {
    return (
        <div className='simple-row'>
            {row.map((note, noteIndex) => {
                return (
                    <SimplePitchCell key={noteIndex} note={note} noteIndex={noteIndex} />
                )
            })}
        </div>
    )
}

export default SimplePitchRow