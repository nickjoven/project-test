import SimplePitchRow from "./SimplePitchRow"

const SimplePitchesContainer = ({ sequence }) => {
    return (
        <div>
            {sequence.filter((element, index) => index < 29).map((row, rowIndex) => {
                return (
                    <SimplePitchRow key={rowIndex} row={row} rowIndex={rowIndex} />
                )

            })}
        </div>
    )
}

export default SimplePitchesContainer