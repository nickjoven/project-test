import { useState } from 'react'

const Cell = ({ note, noteIndex, rowIndex, toggleNote, position, mouseDown }) => {

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

    const getDownbeat = () => {
        if ((noteIndex + 32) % 4 === 0) {
            return 'downbeat'
        } else return ''
    }

    // const handleClick = (e) => {
    //     toggleNote(rowIndex, noteIndex)
    //     console.log(note)
    // }

    const handleMouseDown = (e) => {
        toggleNote(rowIndex, noteIndex)
        console.log(note)
    }

    const handleMouseOver = (e) => {
        if (e.target.className.includes('percussion') && mouseDown) {
            toggleNote(rowIndex, noteIndex)
        }
    }

    return (
        <>
            <button className={`cell ${note.category} hover` + ' ' + getBackground() + ' ' + getDownbeat()} name={note.note} onMouseOver={handleMouseOver} onMouseDown={handleMouseDown} >{' '}</button>
        </>
    )
}

export default Cell