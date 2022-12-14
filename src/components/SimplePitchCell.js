import { useState, useEffect } from 'react'

const SimplePitchCell = ({ note, noteIndex, position, sequenceIndex }) => {
    const [myPixel, setMyPixel] = useState(1)

    useEffect(() => {
        const getBackground = () => {
            setMyPixel(getNumber())
        }
        getBackground()
    }, [])

    const getNumber = () => {
        return (Math.floor(Math.random() * 4) + 1)
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
            <button className={'simple-pitch-cell hover' + ' ' + getBackground()}>{' '}</button>
        </div>

    )
}

export default SimplePitchCell