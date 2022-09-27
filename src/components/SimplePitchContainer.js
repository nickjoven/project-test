import SimplePitchRow from "./SimplePitchRow"

const SimplePitchContainer = ({ pitchColumn, position, columnIndex }) => {
    return (
        <div className='simple-pitch-container'>
            {pitchColumn.map((row, rowIndex) => {
                return (
                    <SimplePitchRow key={rowIndex} row={row} rowIndex={rowIndex} position={position} columnIndex={columnIndex} />
                )     
            })}
        </div>
    )
}

export default SimplePitchContainer