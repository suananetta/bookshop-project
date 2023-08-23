import { useSelector, useDispatch } from 'react-redux';

import styles from './Modal.module.css';

import { Icon_close, Icon_book } from '../../_assets/images/icons';
import Button from '../Button/Button';
import { activeModal } from '../../_redux/manageSlice'

function Modal({ }) {
    const dispatch = useDispatch();
    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);
    const { format } = require('number-currency-format-2');

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalClose}>
                    <Button
                        btnClass={styles.modalCloseBtn}
                        btnName={<Icon_close/>}
                        disabled={false}
                        onClick={() => {
                            dispatch(activeModal());
                        }}
                    />
                </div>
                
                {
                    chosenBooks.map(book => {
                        return (
                            <div className={styles.modalBook}>
                                <Icon_book/>
                                <span className={styles.bookTitle}>{book.volumeInfo.title}</span>
                            
                                <span className={styles.bookPrice}>
                                {
                                    book.saleInfo.saleability === "FREE"? "FREE"
                                    :
                                    format(book.saleInfo.retailPrice.amount, {
                                        currency: `${book.saleInfo.retailPrice.currencyCode}`
                                    })
                                }
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Modal;