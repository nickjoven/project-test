import { useState, useEffect } from 'react'

const SimplePercussionCell = ({ note, rowIndex, position, sequenceIndex, mouseDown, toggleNote }) => {

    const [myPixel, setMyPixel] = useState(1)
    const [mySample, setMySample] = useState(1)

    useEffect(() => {
        const getBackground = () => {
            setMyPixel(getNumber(4))
            setMySample(getNumber(2))
        }
        getBackground()
    }, [])

    const getNumber = (max) => {
        return (Math.floor(Math.random() * max) + 1)
    }

    const getBackground = () => {
        let noteOn = note.isActive
        let barHover = sequenceIndex === (position + 32 - 3) % 32
        switch (true) {
            case noteOn && barHover:
                return 'on-barHover'
            case noteOn && !barHover:
                return `on-${note.category === 'sample' ? note.category+'-'+mySample : note.category}`
            case !noteOn && barHover:
                return `barHover-simple`
            default:
                return `waiting-simple-${myPixel}`
        }
    }
    const handleMouseDown = (e) => {
        toggleNote(rowIndex, sequenceIndex)
        // console.log(note)
    }

    const handleMouseOver = (e) => {
        if (mouseDown) {
            toggleNote(rowIndex, sequenceIndex)
        }
    }
    return (
        <div className='cell-holder'>
            <button className={`simple-${note.category}-cell  hover` + ' ' + getBackground()} onMouseDown={handleMouseDown} onMouseOver={handleMouseOver}>{' '}</button>
        </div>

    )
}

export default SimplePercussionCell
