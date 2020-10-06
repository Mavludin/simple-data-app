import React from 'react';
import classes from './FilterForm.module.css';

import searchIcon from '../../assets/images/search-icon.svg';
import { useSelector } from 'react-redux';

export const FilterForm = ( { filterData }) => {

    const amountOfPages = useSelector(state => state.amountOfPages)
    
    return (
        <div className={classes.FilterBox}>
            <div>
                <strong>Amount of pages: </strong>{amountOfPages}
            </div>
            <form className={classes.FilterForm} action="/" onSubmit={e => e.preventDefault()}>
                <img src={searchIcon} alt="Search Icon"/>
                <input onChange={(e)=>filterData(e.target.value)} type="text" placeholder="Live search"/>
            </form>
        </div>
    )
}