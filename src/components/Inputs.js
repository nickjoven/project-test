import { useState } from 'react'

const Inputs = ({ bpm, handleBpmChange }) => {

    const [tempBpm, setTempBpm] = useState(120)

    const handleClick = (e) => {
        console.log('eh')
        handleBpmChange(e)
    }

    const handleTempBpmChange = (e) => {
        setTempBpm(e.target.value)
    }


    const handleSubmitBpm = (e) => {
        e.preventDefault()
    }

    return (
        <div className='inputs'>
            <div className='form-container'>
                <form onSubmit={handleSubmitBpm}>
                    <input type='range' step='1' name='bp' min='40' max='240' value={tempBpm} onDragEnd={handleClick} onChange={handleTempBpmChange} />
                </form>
            </div>
        </div>
    )
}

export default Inputs