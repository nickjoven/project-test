import Cell from './Cell'

const Row = ({ row, rowIndex, toggleNote, position, mouseDown }) => {
    return (
        <div className='row'>
            {row.map((note, noteIndex) => {
                return (
                    <Cell note={note} key={noteIndex} noteIndex={noteIndex} rowIndex={rowIndex} toggleNote={toggleNote} position={position} mouseDown={mouseDown} 
                    />
                )
            })}
        </div>
    )
}

export default Row