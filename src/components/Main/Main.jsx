import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Tooltip } from 'react-tooltip';

import styles from './Main.module.css';

import Cart from './Cart/Cart'
import Slider from './Slider/Slider';
import List from './List/List';
import Bookcard from './Bookcard/Bookcard';

import Button from '../_shared/Button/Button';
import Loader from '../_shared/Loader/Loader';

import { Icon_up } from '../_assets/images/icons'
import { getBooks } from '../_redux/manageSlice';

function Main({reqInfo}) {  
    const dispatch = useDispatch();
    const searchInfo = useSelector((state) => state.manageBooks);

    let [books, setBooks] = useState([]);

    useEffect(() => {setBooks(searchInfo.booksList)}, [searchInfo.booksList]);
    useEffect(() => {
        if(books.length > 6) {
            document.getElementById('loadBtn').scrollIntoView({ behavior: 'smooth' })
        }
    }, [books])

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
        // console.log(books);
    }

    let upBtnCkick = () => {
        document.getElementById('banner1').scrollIntoView({ behavior: 'smooth' })
    }
    
    return (
        <main>
            <div>
                {
                    searchInfo.activeModal? <Cart/> : ''
                }

                <Slider/>

                <div className={styles.content}>
                    <div className={styles.subjectsList}>
                        <List 
                            ulClass={styles.menu}
                            liName={category}
                            active={clicked}
                            arr={categoryList}
                            onClick={(e) => {
                                categoryClick(e);
                            }}
                        />
                    </div>
                    <div className={styles.booksList}>
                        {   
                            books.length == 0 || searchInfo.loading? 
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
                            books.length == 0 || searchInfo.loading? 
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
                                            upBtnCkick();
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