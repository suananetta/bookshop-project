import { useSelector, useDispatch } from 'react-redux';

import styles from './Modal.module.css';

import { Icon_close, Icon_book } from '../../_assets/images/icons';
import Button from '../Button/Button';
import { activeModal } from '../../_redux/manageSlice'

function Modal({ }) {
    const dispatch = useDispatch();
    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);
    const { format } = require('number-currency-format-2');

    let getTotalPrice = (arr) => {
        let total = 0;
        chosenBooks.forEach(book => {
            total += book.saleInfo.retailPrice? +book.saleInfo.retailPrice.amount : 0;
        });
        return total;
    }
    
    let totalPrice = getTotalPrice(chosenBooks);

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
                                <span className={styles.bookInfo}>
                                    {
                                        book.volumeInfo.title.length > 30?
                                        book.volumeInfo.title.slice(0, 30)+'...'
                                        :
                                        book.volumeInfo.title
                                    }
                                        ,{` `}

                                    <span className={styles.bookAuthor}> 
                                    {
                                    !book.volumeInfo.authors? 'without author' 
                                    : 
                                    book.volumeInfo.authors.length > 1? 'by ' + book.volumeInfo.authors.join(', ').slice(0, 30) + '...'
                                    : 
                                    'by ' + book.volumeInfo.authors[0].slice(0, 30)
                                    }
                                    </span>
                                </span>
                                
                            
                                <span className={styles.bookPrice}>
                                {
                                    book.saleInfo.saleability === "FREE"? 
                                    format('0,00', {currency: 'RUB'})
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
                <div className={styles.modalTotalPrice}>{format(totalPrice, {currency: 'RUB'})}</div>
            </div>
        </div>
    )
}

export default Modal;