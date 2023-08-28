import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.css';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { getBooks } from './components/_redux/manageBooksSlice';
import { getUSD } from './components/_axios/requests'
import { getCurrentUSD } from './components/_redux/manageDisplaySlice';

function App() {
  const dispatch = useDispatch();

  const searchInfo = useSelector((state) => state.manageBooks);

  let reqInfo = {
    currentCategory: searchInfo.initialCategory,
    startIndex: searchInfo.startIndex,
    maxResult: searchInfo.maxResult
  }

  useEffect(() => {
    dispatch(getBooks(reqInfo));
    getUSD().then(res => dispatch(getCurrentUSD(res)));
    return ()=>{};
  }, [])

  return (
    <>
      <Header/>
      <Main reqInfo={reqInfo}/>
    </>
  );
}

export default App;
