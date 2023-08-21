import uniqid from 'uniqid';

function List({ulClass, liClass, arr, onClick}) {
    return (
        <ul className={ulClass}>
            {arr.map(category => {
                return (
                    <li key={uniqid()} className={liClass} onClick={onClick}>{category}</li>
                )
            })}
        </ul>
    )
}

export default List;