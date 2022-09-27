import SimpleColumn from './SimpleColumn'

const SimpleEditor = ({ sequence }) => {

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
        <div className='simple-editor-view'>
            <div className='column-container'>
            {sequence.length > 0 ? getBeatColumns().map((column, columnIndex) => {
                return (
                    <SimpleColumn key={columnIndex} columnIndex={columnIndex} column={column} />
                    )
                }): <></> }
            </div>
        </div>
    )
}

export default SimpleEditor