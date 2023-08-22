import styles from '../Main.module.css';

import Button from '../../_shared/Button/Button';
import { useState } from 'react';


function Bookcard({bookInfo}) {
    const { format } = require('number-currency-format-2');

    let volumeInfo = bookInfo.volumeInfo;
    let saleInfo = bookInfo.saleInfo;

    let [clickedBtn, setClickedBtn] = useState(false)

    let handleClick = () => {
        setClickedBtn(!clickedBtn);
    }

    return (
        <div className={styles.bookBlock}>
            <div 
                className={styles.bookImg} 
                style={{
                    backgroundImage: `url(${volumeInfo.imageLinks? volumeInfo.imageLinks.thumbnail : ''})`,
                    backgroundColor: !volumeInfo.imageLinks? '#5C6A79' : '',
                }}
            >
                {!volumeInfo.imageLinks? 'NO IMAGE AVAILABLE' : ''}
            </div>

            <div className={styles.bookInfo}>

                <span className={styles.bookAuthor}>
                    {
                        !volumeInfo.authors? 'Author not found' 
                        : 
                        volumeInfo.authors.length > 1? volumeInfo.authors.join(', ') 
                        : 
                        volumeInfo.authors[0]
                    }
                </span>

                <span className={styles.bookTitle}>{volumeInfo.title}</span>

                <div className={styles.bookRating}></div>

                <p className={styles.bookDescription}>
                    {volumeInfo.description? volumeInfo.description.slice(0, 100) + '...' : 'No description'}
                </p>

                <span className={styles.bookPrice}>
                    {
                        saleInfo.saleability === "NOT_FOR_SALE"? "NOT FOR SALE" 
                        : 
                        saleInfo.saleability === "FREE"? "FREE"
                        :
                        format(saleInfo.retailPrice.amount, {
                            currency: `${saleInfo.retailPrice.currencyCode}`
                        })
                    }
                </span>

                <Button
                    btnClass={clickedBtn? styles.btnClicked : styles.bookBtn}
                    btnName={clickedBtn? 'in the cart' : 'BUY NOW'}
                    disabled={saleInfo.saleability === "NOT_FOR_SALE"? true : false}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default Bookcard;

/*
    .volumeInfo

    bookCover : .volumeInfo.imageLinks.thumbnail
    bookAuthor: .volumeInfo.authors - array
    bookName: .volumeInfo.title
    bookReviews:  .volumeInfo.averageRating - если "FOR_SALE"
    bookDescription: .volumeInfo.description 100 символов
    bookPrice: .saleInfo.saleability - "NOT_FOR_SALE" / "FOR_SALE"

    "FOR_SALE": .saleInfo.retailPrice.amount .saleInfo.retailPrice.currencyCode
    price
 */