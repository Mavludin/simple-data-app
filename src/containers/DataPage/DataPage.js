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

export const DataPage = ({recievedData, showLoader, history}) => {

    const [typesOfSort, setTypeOfSort] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const pageNumber = useSelector(state => state.pageNumber)

    const dataPerPage = 10;

    const dispatch = useDispatch();

    //Setting the initial amount of pages
    useEffect(()=>{
        dispatch(setAmountOfPages(recievedData, dataPerPage));
        dispatch(paginate(pageNumber));
    }, [dispatch, recievedData, pageNumber, history])


    //Sorting the table by cells
    const sortTable = (pos, item, e) => {

        const tempArray = [...typesOfSort];

        item = item.charAt(0).toLowerCase() + item.substr(1);
        if (!tempArray[pos]) {
            if (isFiltered) filteredData.sort(dynamicSort(item, 'asc'));
            else recievedData.sort(dynamicSort(item, 'asc'));
            tempArray[pos] = true;
            e.currentTarget.querySelectorAll('img')[0].style.display = 'block';
            e.currentTarget.querySelectorAll('img')[1].style.display = 'none';
        } else {
            if (isFiltered) filteredData.sort(dynamicSort(item, 'desc'));
            else recievedData.sort(dynamicSort(item, 'desc'));
            tempArray[pos] = false;
            e.currentTarget.querySelectorAll('img')[1].style.display = 'block';
            e.currentTarget.querySelectorAll('img')[0].style.display = 'none';
        }

        setTypeOfSort(tempArray)

    }

    //Live search function
    const filterData = (string) => {
        let tempNum = 0;
        if (pageNumber > 1) tempNum = pageNumber;
        else if (pageNumber > 1 && string.length > 0) dispatch(paginate(1));
        else if (tempNum !== 0 && string.length === 0) dispatch(paginate(tempNum))

        if (string.length > 0) {
            const tempArray = recievedData.filter(item => {
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
            dispatch(setAmountOfPages(recievedData, dataPerPage));
            setIsFiltered(false);
        }
    }

    //Setting object keys as table header cells
    const tableHeaderCells = getPropertyNames(recievedData[0]);

    const renderedTableHeaderCells = tableHeaderCells.map((item, pos) => {
        typesOfSort.push(false);
        return (
            <th onClick={(e) => sortTable(pos, item, e)} key={pos + 1}>
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
        currentData = recievedData.slice(indexOfFirstItem, indexOfLastItem);
    }

    const renderedData = currentData.map((item, pos) => {
        return (
            <tr key={pos + 1}>
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

                    {
                        (!isFiltered && (recievedData.length > dataPerPage)) ||
                            (isFiltered && (filteredData.length > dataPerPage))
                            ?
                            <Pagination
                                dataPerPage={dataPerPage}
                                totalData={recievedData.length}
                            />
                            : null
                    }
                </div>
            </div>

        </Preloader>
    )
}