import React, { useEffect } from 'react';
import './App.css';

import {DataPage} from './containers/DataPage/DataPage';

import { useDispatch, useSelector } from 'react-redux';
import { loadData } from './store/actions';
import { BrowserRouter } from 'react-router-dom';

import sadIcon from './assets/images/cry.svg'

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
          {
            !recievedData.length
            ?
            <div className="somethingWrong">
              <div><img src={sadIcon} alt="Sad" /></div>
              <h1>Something went wrong! <br/> Make sure the API endpoint returns expected data.</h1>
            </div>
            :
            <DataPage recievedData={recievedData} showLoader={showLoader} />
          }
        </BrowserRouter>
    </div>
  );
}

export default App;