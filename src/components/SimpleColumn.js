import SimplePitchContainer from './SimplePitchContainer'
import SimplePercussionContainer from './SimplePercussionContainer'

const splitColumn = (column) => {
    let splitArray = []
    let pitches = []
    let drums = []
    for (let i = 0; i < 4; i++) {
        drums.push(column[i + 49])
    }
    for (let i = 0; i < 49; i++) {
        pitches.push(column[i])
    }
    splitArray.push(pitches, drums)
    return splitArray
}

const SimpleColumn = ({ column, columnIndex, position, applyPitchPattern }) => {

    return (
        <div className={`column-${columnIndex+1}`}>
            {/* <button onClick={check}>{columnIndex}</button> */}
            <SimplePitchContainer pitchColumn={splitColumn(column)[0]} position={position} columnIndex={columnIndex} applyPitchPattern={applyPitchPattern} />
            <SimplePercussionContainer percussionColumn={splitColumn(column)[1]} position={position} columnIndex={columnIndex} />
        </div>
    )
}

export default SimpleColumn