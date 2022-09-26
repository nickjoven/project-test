import { useState } from 'react'

const Cell = ({ note, noteIndex, rowIndex, toggleNote, position}) => {

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

    const handleClick = (e) => {
        toggleNote(rowIndex, noteIndex)
        console.log(note)
    }


    return (
        <>
            <button className={`cell hover` + ' ' + getBackground() + ' ' + getDownbeat()} name={note.note} onClick={handleClick}>{' '}</button>
        </>
    )
}

export default Cell