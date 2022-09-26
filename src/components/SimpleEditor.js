import SimplePitchesContainer from "./SimplePitchesContainer"
import SimplePercussionContainer from "./SimplePercussionContainer"

const SimpleEditor = ({ sequence, position, setSequence }) => {

    const getPitches = () => {
        sequence.filter((element, index) => index < 29)
    }


    return (
        <div className='simple-editor'>
            <h1>Simple UI</h1>
            <div className='i-am-worm'>
                <SimplePitchesContainer sequence={sequence} position={position} setSequence={setSequence} />
            </div>
        </div>
    )
}

export default SimpleEditor