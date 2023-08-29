import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Tooltip } from 'react-tooltip';

import styles from './Main.module.css';

import Cart from './Cart/Cart';
import Slider from './Slider/Slider';
import List from './List/List';
import Bookcard from './Bookcard/Bookcard';

import Button from '../_shared/Button/Button';
import Loader from '../_shared/Loader/Loader';

import { Icon_up, Icon_close } from '../_assets/images/icons';
import { getBooks } from '../_redux/manageBooksSlice';
import { mobileMenu, searchingResult } from '../_redux/manageDisplaySlice';

function Main({reqInfo}) {  
    const dispatch = useDispatch();

    const booksInfo = useSelector((state) => state.manageBooks);
    const displayInfo = useSelector((state) => state.manageDisplay);

    let [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(booksInfo.booksList)
    }, [booksInfo.booksList]);

    useEffect(() => {
        if(books.length > 6) {
            document.getElementById('loadBtn').scrollIntoView({ behavior: 'smooth' })
        }
    }, [books]);

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
    let [clicked, setClicked] = useState(false);

    let categoryClick = (e) => {
        setCategory(e.target.textContent);
        setClicked(true);
        reqInfo.currentCategory = e.target.textContent;
        dispatch(getBooks(reqInfo)).then((action) => setBooks(action.payload));
    }

    let loadMoreClick = () => {
        reqInfo.currentCategory = category;
        reqInfo.startIndex = books.length;
        dispatch(getBooks(reqInfo)).then((action) => setBooks([...books, ...action.payload]));
    }

    let upBtnClick = () => {
        if(displayInfo.device === 'mobile') {
            document.getElementById('top').scrollIntoView({ behavior: 'smooth' })
        } else {
            document.getElementById('banner1').scrollIntoView({ behavior: 'smooth' })
        }
    }
    
    return (
        <main>
            <div>           
                {displayInfo.openedCart? <Cart/> : ''}

                {displayInfo.device == 'mobile'? <div id='top'></div> : ''}

                <Slider/> 

                <div className={styles.content}>
                    <div 
                        className={displayInfo.showMobileMenu? styles.subjectsListMobile : styles.subjectsList}
                        style={{display: (displayInfo.device == 'mobile' || displayInfo.device == 'tablet') && !displayInfo.showMobileMenu? 'none' : 'flex'}}
                    >
                        {   
                            displayInfo.device == 'mobile' || displayInfo.device == 'tablet'?
                                <Button
                                    btnClass={styles.categoryCloseBtn}
                                    btnName={<Icon_close/>}
                                    disabled={false}
                                    onClick={() => {
                                        dispatch(mobileMenu());
                                    }}
                                />
                                :
                                <></>
                        }
                        <List 
                            ulClass={styles.menu}
                            liName={category}
                            active={clicked}
                            arr={categoryList}
                            onClick={(e) => {
                                categoryClick(e);
                                if(displayInfo.showSearchingResult) dispatch(searchingResult());
                                if(displayInfo.showMobileMenu) dispatch(mobileMenu());
                            }}
                        />
                    </div>
                    
                    <div className={styles.booksList}>
                        {   
                            booksInfo.loading?
                                <Loader/>
                                :
                                displayInfo.showSearchingResult?
                                    booksInfo.searchResult.map(book => {
                                        return (
                                        <Bookcard 
                                            key={uniqid()}
                                            bookInfo={book}
                                            inCart={false}
                                        />
                                        )
                                    })
                                    :
                                    books.length == 0 || booksInfo.loading? 
                                        <Loader/>
                                        :
                                        books.map(book => {
                                            return (
                                            <Bookcard 
                                                key={uniqid()}
                                                bookInfo={book}
                                                inCart={false}
                                            />
                                            )
                                        })
                        }

                        {
                            books.length == 0 || booksInfo.loading || displayInfo.showSearchingResult? 
                                ''
                                :
                                <div className={styles.booksList_btns}>
                                    <Button
                                        btnClass={styles.bookBtn}
                                        btnID='loadBtn'
                                        btnName='LOAD MORE'
                                        disabled={false}
                                        onClick={() => {
                                            loadMoreClick(reqInfo.maxResult);
                                        }}
                                    />
                                    <Button
                                        btnClass={styles.btnUP}
                                        btnName={<Icon_up/>}
                                        disabled={false}
                                        tooltipID='up-tooltip' 
                                        tooltip='Back to top'
                                        onClick={() => {
                                            upBtnClick();
                                        }}
                                    />
                                    <Tooltip id='up-tooltip'/>
                                </div>                       
                        }
                    </div>
                </div >
            </div>
        </main>
    )
}

export default Main;