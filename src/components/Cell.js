import { useState } from 'react'

const Cell = ({ note, noteIndex, rowIndex, toggleNote, position }) => {

    const getBackground = () => {
        let noteOn = note.isActive
        let barHover = noteIndex === (position + 32 - 3) % 32
        switch (true) {
            case noteOn && barHover:
                return 'on-barHover'
            case noteOn && !barHover:
                return 'on'
            case !noteOn && barHover:
                return 'barHover'
            case note.note.includes('#'):
                return 'waiting-accidental'
            default:
                return 'waiting'
        }
    }

    const handleMouseDown = (e) => {
        toggleNote(rowIndex, noteIndex)
    }

    return (
        <>
            <button className={`cell ${note.category} hover` + ' ' + getBackground() + ' '} name={note.note} onMouseDown={handleMouseDown} >{note.note.slice(0, -1)}</button>
        </>
    )
}

export default Cell