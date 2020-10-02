import React, { useState } from 'react';
import classes from './Pagination.module.css';
import { Link, withRouter } from 'react-router-dom';
import prevIcon from '../../assets/images/prev.svg';
import nextIcon from '../../assets/images/next.svg';
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from '../../store/actions';

const PaginationPage = ({history}) => {

    const [inputValue, setInputValue] = useState(null);

    const amountOfPages = useSelector(state => state.amountOfPages);
    const pageNumber = useSelector(state => state.pageNumber);

    const dispatch = useDispatch();

    const paginateForward = (e) => {
        if (pageNumber === amountOfPages) e.preventDefault()
        else {
            dispatch(paginate(pageNumber + 1));
        }
    }

    const paginateBack = (e) => {
        if (pageNumber === 1) e.preventDefault()
        else {
            dispatch(paginate(pageNumber - 1));
        }
    }

    const handleChange = (e) => {
        setInputValue(Number(e.target.value))
    }

    const goTo = (e) => {
        if (inputValue < 1 || inputValue > amountOfPages) e.preventDefault()
        else if (inputValue === pageNumber) e.preventDefault()
        else {
            dispatch(paginate(inputValue));
            history.push(`?page=${inputValue}`);
        }
        e.preventDefault()
    }

    return (
        <nav className={classes.Pagination}>
            <div>
                <Link onClick={paginateBack} to={`?page=${pageNumber - 1}`} >
                    <img src={prevIcon} alt="Previous" />
                </Link>
                <Link onClick={paginateForward} to={`?page=${pageNumber + 1}`} >
                    <img src={nextIcon} alt="Next" />
                </Link>
            </div>
            <div>
                <form action="" onSubmit={goTo}>
                    <input type="number" placeholder="Page number" onChange={handleChange} defaultValue={inputValue} />
                    <button
                        type="submit"
                        className="blackBtn"
                    >
                        Go to
                    </button>
                </form>
            </div>
        </nav>
    )
}

export const Pagination = withRouter(PaginationPage)