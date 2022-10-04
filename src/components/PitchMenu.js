import { useState } from 'react'

const roots = ["I", "ii", "iii", "IV", "V", "vi", "vii°"]
const keys = ["C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F"]
const transpositions = [0, 5, -2, 3, -4, 1, -6, -1, 4, -3, 2, -7]


const PitchMenu = ({ root, setRoot, shufflePattern, transposition, setTransposition, toggleLoad }) => {

    const handleClickRoot = (e) => {
        toggleLoad()
        if (root === roots.map(root => root).indexOf(e.target.name)) {
            shufflePattern()
        } else {
            setRoot(roots.map(root => root).indexOf(e.target.name))
        }
    }

    const handleClickKey = (e) => {
        if (e.shiftKey) {
            setTransposition(prev => (transposition - 1) % transpositions.length)
        }
        else {
            setTransposition(prev => (transposition + 1) % transpositions.length)
        }
    }

    return (
        <div className='pitch-menu'>
            <div className='pitch-buttons'>
                <button className='pitch-button hover' onClick={handleClickKey}>{keys.at(transposition)}</button>
                {roots.map((root) => {
                    return (
                        <button className='pitch-button hover' onClick={handleClickRoot} name={root} key={root}>{root}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default PitchMenu