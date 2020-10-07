import React, { useEffect, useState } from 'react';
import classes from './Pagination.module.css';
import prevIcon from '../../assets/images/prev.svg';
import nextIcon from '../../assets/images/next.svg';
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from '../../store/actions';

export const Pagination = ({ history }) => {

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

    //Firing the effect on every pageNumber change and changing the path accordingly
    useEffect(() => {
        if (pageNumber === 1) history.push('/');
        else history.push(`?page=${pageNumber}`);
    }, [pageNumber, history])

    //Handling the goTo functionality as onSubmit event so it'll work on Enter key as well
    const goTo = (e) => {
        if (inputValue < 1 || inputValue > amountOfPages) e.preventDefault()
        else if (inputValue === pageNumber) e.preventDefault()
        else {
            dispatch(paginate(inputValue));
        }
        e.preventDefault()
    }

    return (
        <nav className={classes.Pagination}>
            <div>
                <button type="button" onClick={paginateBack} >
                    <img src={prevIcon} alt="Previous" />
                </button>
                <button type="button" onClick={paginateForward}>
                    <img src={nextIcon} alt="Next" />
                </button>
            </div>
            <div>
                <form action="" onSubmit={goTo}>
                    <input 
                        type="number"
                        placeholder="Page number"
                        onChange={handleChange}
                        defaultValue={inputValue}
                    />
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