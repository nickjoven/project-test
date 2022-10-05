import { useState } from 'react'

const UiButtons = ({ start, playing, showDetail }) => {
    const [detail, setDetail] = useState(false)

    const handleClick = () => {
        showDetail()
        setDetail(prev => !detail)
    }
    return (
        <div className='ui-buttons'>
            <button className={'ui-button ' + (playing ? 'toggled' : '')} onClick={start}>{!playing ? 'Play' : 'Pause'}</button>
            <button className={'ui-button ' + (detail ? 'toggled' : '')} onClick={handleClick}>Detail</button>
        </div>
    )
}

export default UiButtons