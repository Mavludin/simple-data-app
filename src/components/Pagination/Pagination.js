import React, { useState } from 'react';
import classes from './Pagination.module.css';
import { Link } from 'react-router-dom';
import prevIcon from '../../assets/images/prev.svg';
import nextIcon from '../../assets/images/next.svg';

export const Pagination = ({
    dataPerPage,
    totalData,
    paginate,
    amountOfPages
}) => {

    const [currentPageNum, setCurrentPageNumber] = useState(1);
    const [inputValue, setInputValue] = useState(null);

    const nextPage = (e) => {
        if (currentPageNum === amountOfPages) e.preventDefault()
        else {
            paginate(currentPageNum + 1);
            setCurrentPageNumber(currentPageNum + 1);
        }
    }

    const prevPage = (e) => {
        if (currentPageNum === 1) e.preventDefault()
        else {
            paginate(currentPageNum - 1);
            setCurrentPageNumber(currentPageNum - 1)
        }
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const goTo = (e) => {
        if (inputValue < 1 || inputValue > amountOfPages) e.preventDefault()
        else paginate(inputValue)
    }

    return (
        <nav className={classes.Pagination}>
            <div>
                <Link 
                    onClick={prevPage}
                    to={`?page=${currentPageNum - 1}`} 
                >
                    <img src={prevIcon} alt="Previous" />
                </Link>
                <Link 
                    onClick={nextPage}
                    to={`?page=${currentPageNum + 1}`} 
                >
                    <img src={nextIcon} alt="Next" />
                </Link>
            </div>
            <div>
                <form action="">
                    <input type="number" placeholder="Page number" onChange={handleChange} defaultValue={inputValue} />
                    <Link
                        className="blackBtn"
                        onClick={goTo}
                        to={`?page=${inputValue}`} 
                    >
                        Go to
                    </Link>
                </form>
            </div>
        </nav>
    )
}