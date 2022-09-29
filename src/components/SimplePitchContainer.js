import { useState } from 'react'
import SimplePitchRow from "./SimplePitchRow"

const patterns = [
    [
        [8, 12, 17, 24], [8, 13, 17, 24], [7, 10, 15, 24], [7, 15, 15, 24], [7, 8, 15, 24], [8, 15, 15, 24], [8, 15, 19, 24]
    ],
    [
        [15, 19, 24, 31], [15, 20, 24, 31], [13, 17, 22, 31], [13, 22, 22, 31], [13, 15, 22, 31], [15, 22, 22, 31], [15, 22, 24, 31]
    ],
    [
        [13, 17, 22, 29], [13, 19, 22, 29], [12, 15, 20, 29], [12, 20, 20, 29], [12, 13, 20, 29], [13, 20, 20, 29], [13, 20, 22, 29]
    ]
]

const SimplePitchContainer = ({ pitchColumn, position, columnIndex, applyPitchPattern }) => {
    const [bassIndex, setBassIndex] = useState(0)
    const [chordIndex, setChordIndex] = useState(0)

    const handleClick = (e) => {
        if (e.shiftKey) {
            setBassIndex(1)
        } else if (e.altKey) {
            setBassIndex(2)
        } else {
            setBassIndex(0)
        }
        setChordIndex(chordIndex => (chordIndex + 1) % 7)
        applyPitchPattern(patterns[bassIndex][chordIndex], columnIndex * 4)
    }

    return (
        <div onClick={handleClick} className='simple-pitch-container'>
            {pitchColumn.map((row, rowIndex) => {
                return (
                    <SimplePitchRow key={rowIndex} row={row} rowIndex={rowIndex} position={position} columnIndex={columnIndex} />
                )     
            })}
        </div>
    )
}

export default SimplePitchContainer