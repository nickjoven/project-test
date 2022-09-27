import SimplePercussionCell from './SimplePercussionCell'

const SimplePercussionRow = ({ row, rowIndex, position, columnIndex }) => {
    return (
        <div className='simple-percussion-row'>
            {row.map((note, noteIndex) => {
                return (
                    <SimplePercussionCell key={noteIndex} note={note} noteIndex={noteIndex} sequenceIndex={noteIndex + (columnIndex * 4)} position={position} /> 
                )
            })}
        </div>
    )
}

export default SimplePercussionRow