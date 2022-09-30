import SimplePercussionCell from './SimplePercussionCell'

const SimplePercussionRow = ({ row, rowIndex, position, columnIndex, mouseDown, toggleNote }) => {
    return (
        <div className='simple-percussion-row'>
            {row.map((note, noteIndex) => {
                return (
                    <SimplePercussionCell key={noteIndex} note={note} noteIndex={noteIndex} rowIndex={rowIndex} sequenceIndex={noteIndex + (columnIndex * 4)} position={position} mouseDown={mouseDown} toggleNote={toggleNote} /> 
                )
            })}
        </div>
    )
}

export default SimplePercussionRow