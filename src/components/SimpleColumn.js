import { useState, useEffect } from 'react'
import SimplePitchContainer from './SimplePitchContainer'
import SimplePercussionContainer from './SimplePercussionContainer'

// const roots = ["I", "ii", "iii", "IV", "V", "vi", "vii°"]
// const keys = ["C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F"]
const transpositions = [0, 5, -2, 3, -4, 1, -6, -1, 4, -3, 2, -7]
const rootColors = [
]

// const getKeys = () => {
//     let keyArray = []
//     for (let i = 0; i < keys.length; i++) {
//         let keyObj = {}
//         keyObj.key = keys[i]
//         keyObj.transposition = transpositions[i]
//         keyArray.push(keyObj)
//     }
// } 

const splitColumn = (column) => {
    let splitArray = []
    let pitches = []
    let drums = []
    for (let i = 0; i < 12; i++) {
        drums.push(column[i + 49])
    }
    for (let i = 0; i < 49; i++) {
        pitches.push(column[i])
    }
    splitArray.push(pitches, drums)
    return splitArray
}

const SimpleColumn = ({ started, playing, column, columnIndex, position, applyPitchPattern, mouseDown, toggleNote }) => {
    const [root, setRoot] = useState(0)
    const [offset, setOffset] = useState(0)
    const [transposition, setTransposition] = useState(0)
    const [stretching, setStretching] = useState(false)

    useEffect(() => {
        if (!started) {
            return
        } else {
            const stretch = () => {
                setStretching(stretching => !stretching)
            }
            setTimeout(stretch, (columnIndex * 250 ))
        }
    }, [playing])

    useEffect(() => {
        const getOffset = () => {
            setOffset(transpositions[transposition])
        }
        getOffset()
    }, [transposition])

    return (
        <div className={`column ${stretching && started ? 'stretching' : ''} ${!stretching && !playing && started ? 'unstretch' : ''}`}>
            {stretching}
            <SimplePitchContainer 
                pitchColumn={splitColumn(column)[0]} 
                position={position} 
                columnIndex={columnIndex} 
                applyPitchPattern={applyPitchPattern}
                root={root}
                setRoot={setRoot}
                offset={offset}
                transposition={transposition}
                setTransposition={setTransposition}
            />
            <SimplePercussionContainer 
                percussionColumn={splitColumn(column)[1]} 
                position={position} 
                columnIndex={columnIndex} 
                mouseDown={mouseDown} 
                toggleNote={toggleNote} 
            />
        </div>
    )
}

export default SimpleColumn