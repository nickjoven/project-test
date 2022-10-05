import { useState, useEffect } from 'react'

const SimplePitchCell = ({ note, noteIndex, position, sequenceIndex }) => {
    const [myPixel, setMyPixel] = useState(1)

    useEffect(() => {
        const getBackground = () => {
            setMyPixel(getNumber(2))
        }
        getBackground()
    }, [])

    const getNumber = (max = 2) => {
        return (Math.floor(Math.random() * max) + 3)
    }

    const getBackground = () => {
        let noteOn = note.isActive
        let barHover = sequenceIndex === (position + 32 - 3) % 32
        switch (true) {
            case noteOn && barHover:
                return 'on-barHover'
            case noteOn && !barHover:
                return 'on-pitch'
            case !noteOn && barHover:
                return `barHover-simple`
            default:
                return `waiting-simple-${myPixel}`
        }
    }
    return (
        <div className='cell-holder'>
            <div className={'simple-pitch-cell hover' + ' ' + getBackground()}>{' '}</div>
        </div>

    )
}

export default SimplePitchCell