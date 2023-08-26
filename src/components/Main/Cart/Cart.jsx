import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import styles from './Cart.module.css';

import { Icon_close, Icon_book } from '../../_assets/images/icons';
import Button from '../../_shared/Button/Button';
import Bookcard from '../Bookcard/Bookcard';
import { activeModal } from '../../_redux/manageSlice'

function Modal({ }) {
    const dispatch = useDispatch();
    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);
    const { format } = require('number-currency-format-2');

    let getTotalPrice = (arr) => {
        let total = 0;
        arr.forEach(book => {
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
                
                <div className={chosenBooks.length > 0? styles.modalBody : styles.modalBodyEmpty}>
                    {
                        chosenBooks.length > 0?
                        chosenBooks.map(book => {
                            return (
                                <Bookcard 
                                    key={uniqid()}
                                    bookInfo={book}
                                    inCart={true}
                                />
                            )
                        })
                        :
                        <div className={styles.emptyCart}>Nothing here yet</div>
                    }
                </div>
                <div className={styles.modalTotalPrice}>
                    <span>Total: {format(totalPrice, {currency: 'RUB'})}</span>
                    <Button
                        btnClass={styles.modalCheckoutBtn}
                        btnName='Checkout'
                        disabled={false}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Modal;