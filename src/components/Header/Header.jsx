import styles from './Header.module.css'

import {Icon_profile, Icon_search, Icon_cart} from '../_assets/images/icons'

function Header() {
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
                    <div className={styles.manageItem}><Icon_profile/></div>
                    <div className={styles.manageItem}><Icon_search/></div>
                    <div className={styles.manageItem}><Icon_cart/></div>
                </div>          
            </div>
        </header>
    )
}

export default Header;