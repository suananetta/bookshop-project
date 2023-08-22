import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { getBooks } from './components/_redux/manageSlice';

function App() {
  const dispatch = useDispatch();

  const searchInfo = useSelector((state) => state.manageBooks);
  let [initBooks, setInitBooks] = useState([]);

  let reqInfo = {
    currentCategory: searchInfo.initialCategory,
    startIndex: searchInfo.startIndex,
    maxResult: searchInfo.maxResult
  }

  // let initialState = dispatch(getBooks(reqInfo));

  useEffect(() => {
    dispatch(getBooks(reqInfo));
    return ()=>{};
  }, [])

  return (
    <>
      <Header/>
      <Main 
        reqInfo={reqInfo}
      />
    </>
  );
}

export default App;
