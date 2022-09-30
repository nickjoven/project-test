const SimplePercussionCell = ({ note, rowIndex, position, sequenceIndex, mouseDown, toggleNote }) => {
    const getBackground = () => {
        let noteOn = note.isActive
        let barHover = sequenceIndex === (position + 32 - 3) % 32
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
        toggleNote(rowIndex, sequenceIndex)
        console.log(note)
    }

    const handleMouseOver = (e) => {
        if (mouseDown) {
            toggleNote(rowIndex, sequenceIndex)
        }
    }
    return (
        <div className='cell-holder'>
            <button className={`simple-percussion-cell ${note.category} hover` + ' ' + getBackground()} onMouseDown={handleMouseDown} onMouseOver={handleMouseOver}>{' '}</button>
        </div>

    )
}

export default SimplePercussionCell
