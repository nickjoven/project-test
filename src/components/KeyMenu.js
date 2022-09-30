

const roots = ["I", "ii", "iii", "IV", "V", "vi", "vii°"]

const KeyMenu = ({ root, setRoot, setOffset }) => {

    const handleClick = (e) => {
        setRoot(roots.map(root => root).indexOf(e.target.name))
    }
    return (
        <div className='key-menu'>
            <div className='roots'>
                <div>
                    {roots[root]}    
                </div>
                {roots.map((root) => {
                    return (
                        <button onClick={handleClick} name={root} key={root}>{root}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default KeyMenu

