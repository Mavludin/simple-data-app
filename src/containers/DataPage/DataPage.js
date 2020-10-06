import React, { useEffect, useState } from 'react';
import classes from './DataPage.module.css';

import {Preloader} from '../../components/Preloader/Preloader';
import {Pagination} from '../../components/Pagination/Pagination';
import {FilterForm} from '../../components/FilterForm/FilterForm';

import sortDownIcon from '../../assets/images/sort-down.svg';
import sortUpIcon from '../../assets/images/sort-up.svg';

import { dynamicSort, getPropertyNames } from '../../utils/projectFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setAmountOfPages, paginate } from '../../store/actions';

export const DataPage = ({ history }) => {

    const receivedData = useSelector(state => state.receivedData);
    const showLoader = useSelector(state => state.showLoader);
    const [typesOfSort, setTypeOfSort] = useState(receivedData);
    const [filteredData, setFilteredData] = useState( () => {
        if (receivedData.length > 0) {
            return new Array(Object.keys(receivedData[0]).length).fill(false)
        }
    });
    const [isFiltered, setIsFiltered] = useState(false);
    const pageNumber = useSelector(state => state.pageNumber);

    const dataPerPage = 10;
    const [activeTableHeaderPos, setActiveTableHeader] = useState(null)

    const dispatch = useDispatch();

    
    useEffect(()=>{
        
        //Setting the initial amount of pages and page
        dispatch(setAmountOfPages(receivedData, dataPerPage));

        //Avoiding the effect fire on every page change
        dispatch(paginate(Number(localStorage[('pageNumber')])) || 1);

    }, [dispatch, receivedData])

    //Sorting the table by cells
    const sortTable = (pos, item, e) => {

        const tempArray = [...typesOfSort];

        item = item.charAt(0).toLowerCase() + item.substr(1);
        if (!tempArray[pos]) {
            if (isFiltered) filteredData.sort(dynamicSort(item, 'asc'));
            else receivedData.sort(dynamicSort(item, 'asc'));
            tempArray[pos] = true;
        } else {
            if (isFiltered) filteredData.sort(dynamicSort(item, 'desc'));
            else receivedData.sort(dynamicSort(item, 'desc'));
            tempArray[pos] = false;
        }

        setActiveTableHeader(pos)
        setTypeOfSort(tempArray)

    }

    //Live search function
    const filterData = (string) => {

        //Saving current page number during the searching
        let tempNum = localStorage[('tempPageNum')] || 0;
        if (pageNumber > 1 && string.length > 0) {
            localStorage.setItem('tempPageNum', pageNumber)
            dispatch(paginate(1)); 
        }
        else if (tempNum !== 0 && string.length === 0) dispatch(paginate(tempNum))

        //The search itself
        if (string.length > 0) {
            const tempArray = receivedData.filter(item => {
                item = Object.entries(item);
                for (let key in item) {
                    if (item[key].toString().toLowerCase().includes(string.toLowerCase())) {
                        return item;
                    }
                }
                return null
            });
            dispatch(setAmountOfPages(tempArray, dataPerPage))
            setFilteredData(tempArray);
            setIsFiltered(true);
        } else {
            dispatch(setAmountOfPages(receivedData, dataPerPage));
            setIsFiltered(false);
        }
    }

    //Setting object keys as table header cells
    const tableHeaderCells = getPropertyNames(receivedData[0]);

    const renderedTableHeaderCells = tableHeaderCells.map((item, pos) => {
        let tableHeaderClasses = null;
        if (activeTableHeaderPos === pos) tableHeaderClasses = classes.ActiveTH
        return (
            <th className={tableHeaderClasses} onClick={(e) => sortTable(pos, item, e)} key={pos + 1}>
                <div>
                    <span>{item}</span>
                    <img className={classes.SortDownIcon} src={sortDownIcon} alt="Sort Down" />
                    <img className={classes.SortUpIcon} src={sortUpIcon} alt="Sort Up" />
                </div>
            </th>
        )
    });

    //Rendering only 10 elements per page
    const indexOfLastItem = pageNumber * dataPerPage;
    const indexOfFirstItem = indexOfLastItem - dataPerPage;
    let currentData = [];
    if (isFiltered) {
        currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    } else {
        currentData = receivedData.slice(indexOfFirstItem, indexOfLastItem);
    }

    const renderedData = currentData.map((item, pos) => {
        return (
            <tr key={pos+1}>
                <td>{item.symbol}</td>
                <td>{item.sector}</td>
                <td>{item.securityType}</td>
                <td>{item.bidPrice}</td>
                <td>{item.bidSize}</td>
                <td>{item.askPrice}</td>
                <td>{item.askSize}</td>
                <td>{item.lastUpdated}</td>
                <td>{item.lastSalePrice}</td>
                <td>{item.lastSaleSize}</td>
                <td>{item.lastSaleTime}</td>
                <td>{item.volume}</td>
            </tr>
        )
    });

    return (
        <Preloader visible={showLoader}>
            <div className={classes.DataPage}>
                <div className={classes.Container}>

                    {
                        isFiltered ?
                            <h1>Search results:</h1>
                            : <h1>Data</h1>
                    }

                    <FilterForm filterData={filterData} />

                    <table>
                        <thead>
                            <tr>
                                {renderedTableHeaderCells}
                            </tr>
                        </thead>
                        <tbody>
                            {renderedData}
                        </tbody>
                    </table>

                    <Pagination
                        history={history}
                        dataPerPage={dataPerPage}
                        totalData={receivedData.length}
                    />
                </div>
            </div>

        </Preloader>
    )
}