import React, { useState } from 'react';
import classes from './DataPage.module.css';

import {Preloader} from '../../components/Preloader/Preloader';
import {Pagination} from '../../components/Pagination/Pagination';
import {FilterForm} from '../../components/FilterForm/FilterForm';

import sortDownIcon from '../../assets/images/sort-down.svg';
import sortUpIcon from '../../assets/images/sort-up.svg';

import { dynamicSort, getPropertyNames } from '../../utils/projectFunctions';

export const DataPage = ({recievedData, showLoader}) => {

    const [typesOfSort, setTypeOfSort] = useState([])
    const [pageNum, setPageNum] = useState(1);
    const [tempFilteredData, setTempFilteredData] = useState([]);
    const [isTempFiltered, setIsTempFiltered] = useState(false);

    const dataPerPage = 10;
    let amountOfPages;

    if (tempFilteredData.length > 0) amountOfPages = Math.ceil(tempFilteredData.length / dataPerPage);
    else amountOfPages = Math.ceil(recievedData.length / dataPerPage);

    console.log(recievedData.length)

    const sortTable = (pos, item, e) => {

        const tempArray = typesOfSort;

        item = item.charAt(0).toLowerCase() + item.substr(1);
        if (!tempArray[pos]) {
            recievedData.sort(dynamicSort(item, 'asc'));
            tempArray[pos] = true;
            e.currentTarget.querySelectorAll('img')[0].style.display = 'block';
            e.currentTarget.querySelectorAll('img')[1].style.display = 'none';
        } else {
            recievedData.sort(dynamicSort(item, 'desc'));
            tempArray[pos] = false;
            e.currentTarget.querySelectorAll('img')[1].style.display = 'block';
            e.currentTarget.querySelectorAll('img')[0].style.display = 'none';
        }

        setTypeOfSort(tempArray)
    }

    const paginate = (pageNumber) => {
        setPageNum(pageNumber)
    }

    const filterData = (string) => {
        if (pageNum !== 1) paginate(1);

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
            setTempFilteredData(tempArray)
            setIsTempFiltered(true)
        } else setIsTempFiltered(false);
    }

    const tableHeaderCells = getPropertyNames(recievedData[0]);

    const renderedTableHeaderCells = tableHeaderCells.map((item, pos) => {
        typesOfSort.push(false);
        return (
            <th onClick={(e) => sortTable(pos, item, e)} key={pos + 1}>
                <div onClick={() => false}>
                    <span>{item}</span>
                    <img className={classes.SortDownIcon} src={sortDownIcon} alt="Sort Down" />
                    <img className={classes.SortUpIcon} src={sortUpIcon} alt="Sort Up" />
                </div>
            </th>
        )
    });

    const indexOfLastItem = pageNum * dataPerPage;
    const indexOfFirstItem = indexOfLastItem - dataPerPage;
    let currentData = [];
    if (isTempFiltered) {
        currentData = tempFilteredData.slice(indexOfFirstItem, indexOfLastItem);
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
                        isTempFiltered ?
                            <h1>Search results:</h1>
                            : <h1>Data</h1>
                    }

                    <FilterForm
                        filterData={filterData}
                        amountOfPages={amountOfPages}
                    />

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
                        (!isTempFiltered && (recievedData.length > dataPerPage)) ||
                            (isTempFiltered && (tempFilteredData.length > dataPerPage))
                            ?
                            <Pagination
                                dataPerPage={dataPerPage}
                                totalData={recievedData.length}
                                amountOfPages={amountOfPages}
                                paginate={paginate}
                            />
                            : null
                    }
                </div>
            </div>

        </Preloader>
    )
}