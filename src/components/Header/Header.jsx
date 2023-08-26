import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.css';

import Button from '../_shared/Button/Button';
import Input from '../_shared/SearchInput/SearchInput';
import {Icon_profile, Icon_search, Icon_cart} from '../_assets/images/icons';
import { activeModal } from '../_redux/manageSlice';

function Header() {
    const dispatch = useDispatch();
    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);

    let [showSearch, setShowSearch] = useState(false);

    let handleClick = () => {
        setShowSearch(!showSearch);
    }

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
                {
                    showSearch?
                    <Input
                        onChange={() => {}} 
                        onClick={() => {}}
                    />
                    :
                    ''
                }
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
                            onClick={() => {
                                handleClick()
                            }}
                        />
                        <div className={styles.cartItem}>
                            <Button
                                btnClass={styles.manageItem}
                                btnName={<Icon_cart/>}
                                disabled={false}
                                onClick={() => {
                                    dispatch(activeModal());
                                }}
                            />
                            {
                                chosenBooks.length > 0?
                                    <div className={styles.cartBadge} onClick={() => dispatch(activeModal())}>{chosenBooks.length}</div>
                                    :
                                    ''
                            }
                        </div>
                </div>          
            </div>
        </header>
    )
}

export default Header;