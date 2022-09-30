import { useState } from 'react'
import SimplePitchRow from "./SimplePitchRow"

const patterns = [
    [
        [8, 12, 17, 24], // I
        [8, 12, 17, 29], // I64
        [8, 13, 17, 24], // I43
        [13, 17, 17, 24], // I7
    ],
    [
        [10, 15, 19, 31], // ii6
        [10, 12, 15, 31], // ii65
        [10, 15, 19, 24], // ii42
    ],
    [
        [8, 13, 17, 20], // iii
        [8, 10, 13, 29], // iii65
    ],
    [
        [15, 19, 24, 31], // IV
        [15, 19, 19, 24], // IV64
        [15, 19, 20, 24], // IV43
        [15, 20, 24, 31], // IV7
    ],
    [
        [13, 17, 22, 29], // V
        [13, 19, 22, 29], // V7
        [17, 19, 22, 25], // V65
        [13, 17, 19, 22], // V43
        [13, 17, 22, 31], // V42
    ],
    [
        [15, 20, 24, 27], // vi
        [12, 15, 20, 24], // vi6
        [15, 17, 20, 24], // vi65
    ],
    [
        [13, 15, 19, 22], // vii*65
        [13, 15, 22, 31], // vii*43
        [13, 19, 22, 27], // vii*42
    ],
]

const SimplePitchContainer = ({ root, pitchColumn, position, columnIndex, applyPitchPattern, offset }) => {
    const [pattern, setPattern] = useState(0)



    const handleClick = () => {
        if (pattern > patterns[root].length) {
            setPattern(0)
        }
        applyPitchPattern(patterns[root][pattern], columnIndex * 4, offset)
        setPattern(prev => (pattern + 1) % patterns[root].length )
    }



    return (
        <div onClick={handleClick} className='simple-pitch-container'>
            {pattern}
            {pitchColumn.map((row, rowIndex) => {
                return (
                    <SimplePitchRow root={root} key={rowIndex} row={row} rowIndex={rowIndex} position={position} columnIndex={columnIndex} />
                )     
            })}
        </div>
    )
}

export default SimplePitchContainer