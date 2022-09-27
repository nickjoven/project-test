const SimplePercussionCell = ({ note, noteIndex, position, sequenceIndex }) => {
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
    return (
        <div className='cell-holder'>
            <button className={'simple-percussion-cell hover' + ' ' + getBackground()}>{' '}</button>
        </div>

    )
}

export default SimplePercussionCell
