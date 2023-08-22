import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import styles from './Main.module.css'

import Slider from './Slider/Slider';
import List from './List/List';
import Bookcard from './Bookcard/Bookcard';

import Button from "../_shared/Button/Button";
import Loader from '../_shared/Loader/Loader';
import { useEffect, useState } from 'react';
import { getBooks } from '../_redux/manageSlice';

function Main({reqInfo}) {  
    const dispatch = useDispatch();

    const searchInfo = useSelector((state) => state.manageBooks);

    let [books, setBooks] = useState([]);

    useEffect(() => {setBooks(searchInfo.booksList)}, [searchInfo.booksList])

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

    // let reqInfo = {
    //     currentCategory: category,
    //     startIndex: searchInfo.startIndex,
    //     maxResult: searchInfo.maxResult
    // }

    let categoryClick = (e) => {
        setCategory(e.target.textContent);

        reqInfo.currentCategory = e.target.textContent;

        dispatch(getBooks(reqInfo)).then((action) => setBooks(action.payload));

        setClicked(true);
    }

    let loadMoreClick = () => {
        reqInfo.currentCategory = category;
        reqInfo.startIndex = books.length;
        
        dispatch(getBooks(reqInfo)).then((action) => setBooks([...books, ...action.payload]));
        console.log(books);
    }

    // useEffect(()=>{
    //     document.getElementById('loadBtn').scrollIntoView();
    // }, [books])

    
    return (
        <main>
            <div>
                <Slider/>
                

                <div className={styles.content}>
                    <div className={styles.subjectsList}>
                        <List 
                            ulClass={styles.menu}
                            liName={category}
                            active={clicked}
                            arr={categoryList}
                            onClick={async (e) => {
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
                                    />
                                    )
                                })
                        }
                        {
                            books.length == 0 || searchInfo.loading? 
                            ''
                            :
                            <Button
                                btnClass={styles.bookBtn}
                                id='loadBtn'
                                btnName='LOAD MORE'
                                disabled={false}
                                onClick={() => {loadMoreClick(reqInfo.maxResult)}}
                            />
                        }
                        
                    </div>
                </div >
            </div>
        </main>
    )
}

export default Main;