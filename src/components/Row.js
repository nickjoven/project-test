import Cell from './Cell'

const Row = ({ row, rowIndex, toggleNote, position }) => {
    return (
        <div className='row'>
            {row.map((note, noteIndex) => {
                return (
                    <Cell note={note} key={noteIndex} noteIndex={noteIndex} rowIndex={rowIndex} toggleNote={toggleNote} position={position}  
                    />
                )
            })}
        </div>
    )
}

export default Row