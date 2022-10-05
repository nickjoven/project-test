import { useState } from 'react'

const Inputs = ({ bpm, handleBpmChange }) => {

    const [tempBpm, setTempBpm] = useState(120)

    const handleTempBpmChange = (e) => {
        setTempBpm(e.target.value)
        handleBpmChange(e)
    }


    const handleSubmitBpm = (e) => {
        e.preventDefault()
    }

    return (
        <div className='inputs'>
            <div className='margin'>
                {bpm} bpm
            </div>
            <div className='form-container'>
                <form onSubmit={handleSubmitBpm}>
                    <input type='range' step='1' name='bp' min='40' max='180' value={tempBpm} onChange={handleTempBpmChange} />
                </form>
            </div>
        </div>
    )
}

export default Inputs