import React, { useEffect } from 'react';
import './App.css';

import {DataPage} from './containers/DataPage/DataPage';

import { useDispatch, useSelector } from 'react-redux';
import { loadData } from './store/actions';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  const dispatch = useDispatch();

  const recievedData = useSelector(state => state.recievedData);
  const showLoader = useSelector(state => state.showLoader);

  useEffect(() => {
    dispatch(loadData())
  }, [dispatch])

  return (
    <div className="App">
        <BrowserRouter>
          <DataPage recievedData={recievedData}  showLoader={showLoader} />
        </BrowserRouter>
    </div>
  );
}

export default App;