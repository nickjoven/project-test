import SimplePercussionRow from './SimplePercussionRow'

const SimplePercussionContainer = ({ percussionColumn, position, columnIndex }) => {
    return (
        <div className='simple-percussion-container'>
            {percussionColumn.map((row, rowIndex) => {
                return (
                    <SimplePercussionRow key={rowIndex} row={row} rowIndex={rowIndex} position={position} columnIndex={columnIndex} />
                )
            })}
        </div>
    )
}

export default SimplePercussionContainer