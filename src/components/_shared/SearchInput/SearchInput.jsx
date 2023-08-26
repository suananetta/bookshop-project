import styles from './SearchInput.module.css';

import { Icon_search } from '../../_assets/images/icons';

function SearchInput({onChange, onClick}) {
    return (
        <div className={styles.inputBlock}>
            <input 
                className={styles.inputPlace}
                type='text'
                name='seachBook' 
                placeholder='Enter here'
                onChange={onChange} 
            />
            <button className={styles.inputBtn}><Icon_search/></button>
        </div>
    )
}

export default SearchInput;