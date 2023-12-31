import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../Main.module.css';

import Button from '../../_shared/Button/Button';
import StarRating from '../../_shared/StarRating/StarRating';

import { selectBook, removeBook } from '../../_redux/manageBooksSlice';

function Bookcard({bookInfo, inCart}) {
    const { format } = require('number-currency-format-2');
    const dispatch = useDispatch();

    const chosenBooks = useSelector((state) => state.manageBooks.chosenBooks);
    const currentUSD = useSelector((state) => state.manageDisplay.currentUSD);

    let volumeInfo = bookInfo.volumeInfo;
    let saleInfo = bookInfo.saleInfo;

    let [clickedBtn, setClickedBtn] = useState(false);

    let handleClick = (e) => {
        if(e.target.innerText === 'BUY NOW') {
            dispatch(selectBook(bookInfo));
        } else {
            dispatch(removeBook(bookInfo));
        }   
    }

    useEffect(() => {
        chosenBooks.map(book => {
            if(book === bookInfo) setClickedBtn(!clickedBtn);
        })
    }, [chosenBooks]);

    return (
        <div className={inCart? styles.bookCartBlock : styles.bookBlock}>
            <div 
                className={inCart? styles.bookCartImg : styles.bookImg} 
                style={{
                    backgroundImage: `url(${volumeInfo.imageLinks? volumeInfo.imageLinks.thumbnail : ''})`,
                    backgroundColor: !volumeInfo.imageLinks? '#5C6A79' : '',
                }}
            >
                {!volumeInfo.imageLinks? 'NO IMAGE AVAILABLE' : ''}
            </div>

            <div className={inCart? styles.bookCartInfo : styles.bookInfo}>
                <span className={styles.bookAuthor}>
                    {
                        !volumeInfo.authors? 'Author not found' 
                        : 
                        volumeInfo.authors.length > 1? volumeInfo.authors.join(', ') 
                        : 
                        volumeInfo.authors[0]
                    }
                </span>

                <span className={styles.bookTitle}>{inCart? volumeInfo.title.slice(0, 30) + '...' : volumeInfo.title}</span>

                {   
                    inCart? 
                        <></>
                        :
                        <div className={styles.bookRating}>
                            <StarRating 
                                rating={typeof(volumeInfo.averageRating) === 'number'? volumeInfo.averageRating : 0}
                            />
                            <div className={styles.bookReview}>{volumeInfo.ratingsCount? volumeInfo.ratingsCount : 0} review</div>
                        </div>
                }

                <p className={styles.bookDescription} style={{display: inCart? 'none' : 'block'}}>
                    {volumeInfo.description? volumeInfo.description.slice(0, 100) + '...' : 'No description'}
                </p>

                <span className={styles.bookPrice}>
                    {
                        saleInfo.saleability === "NOT_FOR_SALE"? "NOT FOR SALE" 
                        : 
                        saleInfo.saleability === "FREE"? "FREE"
                        :
                        format(saleInfo.retailPrice.amount/currentUSD, {
                            currency: `USD`
                        })
                    }
                </span>

               { 
                    inCart?
                        <Button
                            btnClass={styles.btnRemove}
                            btnName='Remove from cart'
                            disabled={false}
                            onClick={() => {dispatch(removeBook(bookInfo))}}
                        />
                        :
                        <Button
                            btnClass={clickedBtn? styles.btnClicked : styles.bookBtn}
                            btnName={clickedBtn? 'in the cart' : 'BUY NOW'}
                            disabled={saleInfo.saleability === "NOT_FOR_SALE"? true : false}
                            onClick={(e) => {handleClick(e)}}
                        />
                }
            </div>
        </div>
    )
}

export default Bookcard;
