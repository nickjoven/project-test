import KeyMenu from "./KeyMenu"

const PitchSelector = ({ root, setRoot, setOffset }) => {

    return (
        <div className='pitch-selector'>
            <KeyMenu root={root} setRoot={setRoot} setOffset={setOffset} />
        </div>
    )
}

export default PitchSelector