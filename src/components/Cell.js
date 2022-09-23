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
            default:
                return 'waiting'
        }
    }

    const handleClick = (e) => {
        toggleNote(rowIndex, noteIndex)
        console.log(note)
    }


    return (
        <>
            <button className={`cell hover ` + getBackground()} name={note.note} onClick={handleClick}>{' '}</button>
        </>
    )
}

export default Cell