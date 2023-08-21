import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import styles from './Main.module.css'

import Slider from './Slider/Slider';
import List from './List/List';
import Bookcard from './Bookcard/Bookcard';

import Button from "../_shared/Button/Button";
import { useState } from 'react';
import { getBooks } from '../_redux/manageSlice';

function Main() {  
    const dispatch = useDispatch();

    const searchInfo = useSelector((state) => state.manageBooks);

    let categoryList = [
        'Architecture', 
        'Art & Fashion', 
        'Biography', 
        'Business', 
        'Crafts & Hobbies', 
        'Drama', 
        'Fiction', 
        'Food & Drink',
        'Health & Wellbeing',
        'History & Politics', 
        'Humor', 
        'Poetry', 
        'Psychology', 
        'Science', 
        'Technology', 
        'Travel & Maps'
    ];

    let [category, setCategory] = useState('Architecture');

    let reqInfo = {
        currentCategory: category,
        startIndex: searchInfo.startIndex,
        maxResult: searchInfo.maxResult
    };

    let books = searchInfo.booksList;

    // console.log(books);

    let handleClick = (e) => {
        setCategory(e.target.textContent);
    }

    return (
        <main>
            <div>
                <div className={styles.mock}></div>

                <Slider/>

                <div className={styles.content}>
                    <div className={styles.subjectsList}>
                        <List 
                            ulClass={styles.menu}
                            liClass={styles.menuItem}
                            arr={categoryList}
                            onClick={(e) => {
                                handleClick(e);
                                dispatch(getBooks(reqInfo));
                            }}
                        />
                    </div>
                    <div className={styles.booksList}>
                        {
                            books.map(book => {
                                // console.log(book);
                                return (
                                <Bookcard 
                                    key={uniqid()}
                                    bookInfo={book}
                                />
                                )
                            })
                        }
                    </div>
                </div >
                {/* <Button
                    btnClass={''}
                    btnName='API'
                    disabled={false}
                    onClick={request}/> */}
            </div>
        </main>
    )
}

export default Main;