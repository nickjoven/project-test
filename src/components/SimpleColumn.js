const SimpleColumn = ({ column, columnIndex }) => {
    const check = () => {
        console.log(column)
    }
    return (
        <div className='column'>
            <button onClick={check}>{columnIndex}</button>
        </div>
    )
}

export default SimpleColumn