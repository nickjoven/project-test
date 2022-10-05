import { useState } from 'react'
import SimpleColumn from './SimpleColumn'

const SimpleEditor = ({ detailView, started, playing, sequence, position, applyPitchPattern, toggleNote }) => {
    const [mouseDown, setMouseDown] = useState(false)

    const handleMouseDown = () => {
        if (!mouseDown) {
            setMouseDown(prev => !mouseDown)
        }
    }

    const handleMouseUp = () => {
        if (mouseDown) {
            setMouseDown(prev => !mouseDown)
        }
    }

    const getBeat = (row, currentIndex) => {
        let beat = []
        for (let i = 0; i < 4; i++) {
            beat.push(row[currentIndex + i])
        }
        return beat
    }


    const getBeatColumns = () => {
        let beats = []
        for (let i = 0; i < 8; i++) {
            let column = []
            sequence.map((row) => {
                column.push(getBeat(row, i * 4))    
            }) 
            beats.push(column)
        } 
        return beats
    }

    return (
        <div className={detailView? 'margin' : 'simple-editor-view'} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div className='centered-content'>
                <div className='column-container'>
                {sequence.length > 0 ? getBeatColumns().map((column, columnIndex) => {
                    return (
                        <SimpleColumn 
                            key={columnIndex} 
                            started={started}
                            playing={playing}
                            columnIndex={columnIndex} 
                            column={column} 
                            position={position} 
                            applyPitchPattern={applyPitchPattern} 
                            mouseDown={mouseDown} 
                            toggleNote={toggleNote}
                        />
                        )
                    }): <></> }
                </div>
            </div>
        </div>
    )
}

export default SimpleEditor