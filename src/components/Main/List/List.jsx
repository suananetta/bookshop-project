import { useSelector } from 'react-redux';
import uniqid from 'uniqid';

import styles from '../Main.module.css';

function List({ulClass, liName, active, arr, onClick}) {
    const displayInfo = useSelector((state) => state.manageDisplay);

    return (
        <ul className={ulClass}>
            {arr.map(category => {
                return (
                    <li 
                        key={uniqid()} 
                        className={
                            displayInfo.showSearchingResult?
                                styles.menuItem
                                :
                                liName === category && active? 
                                    styles.menuItemActive 
                                    : 
                                    styles.menuItem
                            } 
                        onClick={onClick}
                    >
                        {category}
                    </li>
                )
            })}
        </ul>
    )
}

export default List;