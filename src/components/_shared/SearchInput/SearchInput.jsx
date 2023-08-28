import styles from './SearchInput.module.css';

import { Icon_search } from '../../_assets/images/icons';

function SearchInput({onChange, onClick}) {
    return (
        <div className={styles.inputBlock}>
            <input 
                className={styles.inputPlace}
                type='text'
                name='seachBook' 
                placeholder='Enter title or author'
                onChange={onChange} 
            />
            <button className={styles.inputBtn} onClick={onClick}><Icon_search/></button>
        </div>
    )
}

export default SearchInput;