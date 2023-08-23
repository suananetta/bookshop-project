import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.css';

import Button from '../_shared/Button/Button';
import {Icon_profile, Icon_search, Icon_cart} from '../_assets/images/icons';
import { activeModal } from '../_redux/manageSlice';


function Header() {
    const dispatch = useDispatch();

    return (
        <header>
            <div className={styles.container}>
                <span className={styles.logoName}>Bookshop</span>
                <nav>
                    <ul className={styles.navigation}>
                        <li className={styles.navItem}><a href='#'>books</a></li>
                        <li className={styles.navItem}><a href='#'>audiobooks</a></li>
                        <li className={styles.navItem}><a href='#'>Stationery & gifts</a></li>
                        <li className={styles.navItem}><a href='#'>blog</a></li>
                    </ul>
                </nav>
                <div className={styles.management}>
                        <Button
                            btnClass={styles.manageItem}
                            btnName={<Icon_profile/>}
                            disabled={false}
                            onClick={(e) => {
                                console.log(e);
                            }}
                        />
                        <Button
                            btnClass={styles.manageItem}
                            btnName={<Icon_search/>}
                            disabled={false}
                            onClick={(e) => {
                                console.log(e);
                            }}
                        />
                        <Button
                            btnClass={styles.manageItem}
                            btnName={<Icon_cart/>}
                            disabled={false}
                            onClick={() => {
                                dispatch(activeModal());
                            }}
                        />
                </div>          
            </div>
        </header>
    )
}

export default Header;