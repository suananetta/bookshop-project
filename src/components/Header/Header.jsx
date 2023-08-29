import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.css';

import {Icon_profile, Icon_search, Icon_cart, Icon_burger} from '../_assets/images/icons';
import Button from '../_shared/Button/Button';
import SearchInput from '../_shared/SearchInput/SearchInput';

import { getBookVolume } from '../_redux/manageBooksSlice';
import { openCart, searchingResult, mobileMenu } from '../_redux/manageDisplaySlice';

function Header() {
    const dispatch = useDispatch();
    
    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);
    const displayInfo = useSelector((state) => state.manageDisplay);

    let [showSearch, setShowSearch] = useState(false);
    let [searchData, setSearchData] = useState('');

    let handleClick = () => {
        setShowSearch(!showSearch);
    }

    let handleChange = (e) => {
        setSearchData(e.target.value);
    }

    let searchRequest = (data) => {
        dispatch(getBookVolume(data));
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
                        <SearchInput
                            onChange={(e) => {handleChange(e)}} 
                            onClick={() => {
                                searchRequest(searchData);
                                dispatch(searchingResult(true));
                            }}
                        />
                        :
                        <></>
                }
                <div className={styles.management}>
                        <Button
                            btnClass={styles.manageItem}
                            btnName={<Icon_profile/>}
                            disabled={false}
                            onClick={() => {}}
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
                                    dispatch(openCart());
                                }}
                            />
                            {
                                chosenBooks.length > 0?
                                    <div className={styles.cartBadge} onClick={() => dispatch(openCart())}>{chosenBooks.length}</div>
                                    :
                                    ''
                            }
                        </div>
                        {displayInfo.device !== 'desktop'?
                            <Button
                                btnClass={styles.manageItem}
                                btnName={<Icon_burger/>}
                                btnID='burger-btn'
                                disabled={false}
                                onClick={() => {
                                    dispatch(mobileMenu());
                                }}
                            />
                            :
                            <></>
                        }
                </div>          
            </div>
        </header>
    )
}

export default Header;