import SimplePercussionRow from './SimplePercussionRow'

const SimplePercussionContainer = ({ percussionColumn, position, columnIndex, mouseDown, toggleNote }) => {
    return (
        <div className='simple-percussion-container'>
            {percussionColumn.map((row, rowIndex) => {
                return (
                    <SimplePercussionRow key={rowIndex} row={row} rowIndex={rowIndex + 49} position={position} columnIndex={columnIndex} mouseDown={mouseDown} toggleNote={toggleNote} />
                )
            })}
        </div>
    )
}

export default SimplePercussionContainer