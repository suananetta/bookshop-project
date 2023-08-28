import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import styles from './Cart.module.css';

import { Icon_close } from '../../_assets/images/icons';
import Button from '../../_shared/Button/Button';
import Bookcard from '../Bookcard/Bookcard';
import { openCart } from '../../_redux/manageDisplaySlice';

function Cart() {
    const dispatch = useDispatch();
    const { format } = require('number-currency-format-2');

    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);
    const currentUSD = useSelector((state) => state.manageDisplay.currentUSD);

    let getTotalPrice = (arr) => {
        let total = 0;
        arr.forEach(book => {
            total += book.saleInfo.retailPrice? +book.saleInfo.retailPrice.amount/currentUSD : 0;
        });
        return total;
    }
    
    let totalPrice = getTotalPrice(chosenBooks);

    return (
        <div className={styles.cart}>
            <div className={styles.cartContent}>
                <div className={styles.cartClose}>
                    <Button
                        btnClass={styles.cartCloseBtn}
                        btnName={<Icon_close/>}
                        disabled={false}
                        onClick={() => {
                            dispatch(openCart());
                        }}
                    />
                </div>
                
                <div className={chosenBooks.length > 0? styles.cartBody : styles.cartBodyEmpty}>
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
                <div className={styles.cartTotalPrice}>
                    <span>Total: {format(totalPrice, {currency: 'USD'})}</span>
                    <Button
                        btnClass={styles.cartCheckoutBtn}
                        btnName='Checkout'
                        disabled={false}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cart;